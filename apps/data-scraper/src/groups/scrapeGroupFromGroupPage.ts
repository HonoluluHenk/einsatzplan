import type { Championship } from '@einsatzplan/model/Championship';
import type { GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import type { Season } from '@einsatzplan/model/Season';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { ErrorWithCause } from '../utils/ErrorWithCause';
import type { FileLoader } from '../utils/FileLoader';
import { loadCheerio } from '../utils/loadCheerio';
import type { GroupIntermediate } from './scrapeGroupIntermediatesFromLigenplan';

export async function scrapeGroupFromGroupPage(
  intermediate: GroupIntermediate,
  season: Season,
  championship: Championship,
  loader: FileLoader,
): Promise<GroupMasterData> {
  try {
    const html = await loader.load(intermediate.clickTTUrl);

    const $ = loadCheerio(html);

    const div = $('#content div#content-col1');
    const header = requireValue(div.find('h1')
      .html());

    const longName = parseLongNameFromHeader(header);

    const system = div.find('h2')
      .filter((_, el) => $(el)
        .text()
        .includes('Spielsystem'))
      .next('p')
      .text()
      .trim();


    return ensureProps<GroupMasterData>({
      id: parseID('Group', intermediate.shortName),
      shortName: intermediate.shortName,
      longName,
      clickTTUrl: intermediate.clickTTUrl,
      system,
      season,
      championship,
    });
  } catch (error) {
    throw new ErrorWithCause('Error processing ' + intermediate.clickTTUrl, error);
  }
}


function parseLongNameFromHeader(header: string): string {
  // example input:
  //MTTV Mannschaftsmeisterschaft 2024/25
  //<br>
  //3. Liga Herren Gruppe 2
  //<br>
  //Tabelle und Spielplan (Aktuell)
  const result = header.split('<br>')
    .slice(1, 2)[0].trim();

  return result;
}
