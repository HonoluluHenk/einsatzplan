import type { GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import * as cheerio from 'cheerio';
import type { FileLoader } from '../utils/FileLoader';
import type { GroupIntermediate } from './scrapeGroupIntermediatesFromLigenplan';

export async function scrapeGroupFromGroupPage(
  intermediate: GroupIntermediate,
  loader: FileLoader,
): Promise<GroupMasterData> {
  const html = await loader.load(intermediate.clickTTUrl);

  const $ = cheerio.load(html);

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
  });
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
