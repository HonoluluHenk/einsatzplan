import type { Match } from '@einsatzplan/model/Match';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { cleanPathForFirebaseKey } from '@einsatzplan/shared-util/firebase-util';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import * as cheerio from 'cheerio';
import type { FileLoader } from '../utils/FileLoader';

export async function scrapeMatchesFromGroupMatchesPage(
  matchesPageUrl: string,
  loader: FileLoader,
): Promise<Match[]> {
  const html = await loader.load(matchesPageUrl);

  const $ = cheerio.load(html);

  const dataRows = $('#content table.result-set tr')
    .toArray()
    // strip header row
    .slice(1);

  const parsed = dataRows.map(row => {
    const cells = $('td', row);
    const date = cells
      .eq(1)
      .text()
      .trim();
    const timeAndFlags = cells
      .eq(2)
      .text()
      .trim();
    const startTime = timeAndFlags.split(' ')[0];
    const flags = timeAndFlags.split(' ')
      .slice(10)[0];
    const venue = cells
      .eq(3)
      .text()
      .trim();
    const homeTeam = cells
      .eq(5)
      .text()
      .trim();
    const opponentTeam = cells
      .eq(7)
      .text()
      .trim();

    // FIXME: add group id
    const id: `Match:${string}` = parseID('Match', cleanPathForFirebaseKey(`${homeTeam}-vs-${opponentTeam}`));

    return ensureProps<Match>({
      id,
      date: date as any,
      homeTeamId: homeTeam as any,
      opponentTeamId: opponentTeam as any,
      venueId: venue as any,
      startTime: startTime as any,
      flags: flags as any,
    });
  });

  return parsed;
}
