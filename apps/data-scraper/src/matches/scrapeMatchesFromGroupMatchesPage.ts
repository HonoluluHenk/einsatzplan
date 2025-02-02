import type { Championship } from '@einsatzplan/model/Championship';
import type { Group } from '@einsatzplan/model/GroupMasterData';
import type { Match } from '@einsatzplan/model/Match';
import type { Season } from '@einsatzplan/model/Season';
import type { VenueID } from '@einsatzplan/model/Venue';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { cleanPathForFirebaseKey } from '@einsatzplan/shared-util/firebase-util';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { trimToUndefined } from '@einsatzplan/shared-util/string-util';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import type { ISOLocalDateString } from '@einsatzplan/shared-util/types/ISOLocalDateString';
import type { ISOLocalTimeString } from '@einsatzplan/shared-util/types/ISOLocalTimeString';
import type { Cheerio, CheerioAPI } from 'cheerio';
import { format, parse } from 'date-fns';
import type { Element } from 'domhandler';
import { ErrorWithCause } from '../utils/ErrorWithCause';
import type { FileLoader } from '../utils/FileLoader';
import { loadCheerio } from '../utils/loadCheerio';
import { withTracing } from '../utils/withTracing';


export async function scrapeMatchesFromGroupMatchesPage(
  season: Season,
  championship: Championship,
  group: Group,
  matchesPageUrl: string,
  loader: FileLoader,
): Promise<Match[]> {
  return withTracing('scrapeMatchesFromGroupMatchesPage', async () => {
    try {
      const html = await loader.load(matchesPageUrl);

      const $ = loadCheerio(html);

      const clickTTGroupId = parseClickTTGroupId($);

      const dataRows = $('#content table.result-set tr')
        .toArray()
        // strip heading row
        .slice(1);

      const rawData: RawRowValues[] = dataRows
        .map(row => extractRawValuesFromRow($('td', row)));
      rawData.forEach(fillMissingDateFromPreviousRow);

      const result = rawData.map((row) => parseRawDataIntoMatch(
        season,
        championship,
        group,
        row,
        clickTTGroupId,
      ));

      return result;
    } catch (error) {
      throw new ErrorWithCause(`Error processing ${matchesPageUrl}`, error);
    }
  });
}

function parseRawDataIntoMatch(
  season: Season,
  championship: Championship,
  group: Group,
  row: RawRowValues,
  clickTTGroupId: string,
): Match {
  const id: `Match:${string}` = parseID('Match', cleanPathForFirebaseKey(`${(row.homeTeam)}-vs-${(row.opponentTeam)}-group-${clickTTGroupId}`));
  const homeTeamId = parseID('Team', row.homeTeam);
  const opponentTeamId = parseID('Team', row.opponentTeam);
  const venueId = parseVenueId(row.venue);
  const date = parseDate(row.rawDate);
  const {startTime, flags} = parseTimeAndFlags(row.timeAndFlags);

  return ensureProps<Match>({
    id,
    homeTeamId,
    opponentTeamId,
    venueId,
    date,
    startTime,
    flags,
    season,
    championship,
    group,
  });
}

function parseTimeAndFlags(timeAndFlags: string): {
  startTime: ISOLocalTimeString,
  flags: string | undefined,
}
{
  const [time, flags] = timeAndFlags.split(/\s+/);
  const startTime = parseTime(time);

  return {
    startTime,
    flags: flags || undefined,
  };

}

function parseVenueId(venue: string): VenueID | undefined {
  if (venue === '') {
    return undefined;
  }
  // venue is of the format "(n)" where n is the venue number
  const number = requireValue(venue.match(/\((.)\)/)?.[1], `Cannot parse Venue from "${venue}"`);

  return parseID('Venue', number);
}

function parseDate(text: string): ISOLocalDateString {
  const date = parse(text, 'dd.MM.yyyy', new Date());
  if (isNaN(date.getDate())) {
    throw Error(`Cannot parse date from "${text}"`);
  }
  return format(date, 'yyyy-MM-dd') as ISOLocalDateString;
}


function parseTime(text: string): ISOLocalTimeString {
  const time = parse(text, 'HH:mm', new Date());
  if (isNaN(time.getHours())) {
    throw Error(`Cannot parse time from "${text}"`);
  }
  return format(time, 'HH:mm:ss') as ISOLocalTimeString;
}

type RawRowValues = {
  rawDate: string;
  timeAndFlags: string;
  venue: string
  homeTeam: string;
  homeWin: string | undefined;
  opponentTeam: string;
  opponentWin: string | undefined;
  matchResult: string | undefined;
  matchResultUrl: string | undefined;
};

function extractRawValuesFromRow(cells: Cheerio<Element>): RawRowValues {
  const rawDate = cells
    .eq(1)
    .text()
    .trim();
  const timeAndFlags = cells
    .eq(2)
    .text()
    .trim();
  const venue = cells
    .eq(3)
    .text()
    .trim();
  // 4 ???
  const homeTeam = cells
    .eq(5)
    .text()
    .trim();
  const homeWin = trimToUndefined(cells
    .eq(6)
    .text());
  const opponentTeam = cells
    .eq(7)
    .text()
    .trim();
  const opponentWin = trimToUndefined(cells
    .eq(8)
    .text());
  const matchResult = trimToUndefined(cells
    .eq(9)
    .text());
  const matchResultUrl = trimToUndefined(cells
    .eq(9)
    .find('a')
    .attr('href'));
  // 10 ???
  // 11 ???

  return {
    rawDate,
    timeAndFlags,
    venue,
    homeTeam,
    homeWin,
    opponentTeam,
    opponentWin,
    matchResult,
    matchResultUrl,
  };
}

function fillMissingDateFromPreviousRow(entry: RawRowValues, i: number, array: RawRowValues[]): void {
  if (entry.rawDate === '') {
    entry.rawDate = array[i - 1].rawDate;
  }
}


function parseClickTTGroupId($: CheerioAPI): string {
  const clickTTGroupId = $('html>head>meta[name*="nuLigaStatsUrl"][content*="group="]')
    .attr('content')
    ?.match(/group=(\d+)/)
    ?.[1];

  if (!clickTTGroupId) {
    throw Error('Cannot find clickTTGroupId');
  }
  return clickTTGroupId;
}
