import type { Championship } from '@einsatzplan/model/Championship';
import type { GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import type { Season } from '@einsatzplan/model/Season';
import type { FileLoader } from '../utils/FileLoader';
import { scrapeGroupFromGroupPage } from './scrapeGroupFromGroupPage';
import { scrapeGroupIntermediatesFromLigenplan } from './scrapeGroupIntermediatesFromLigenplan';

export async function scrapeGroupsFromLigenplan(
  url: string,
  season: Season,
  championship: Championship,
  loader: FileLoader,
): Promise<GroupMasterData[]> {
  const groupIntermediates = await scrapeGroupIntermediatesFromLigenplan(url, loader);

  const tasks = groupIntermediates
    .map(groupIntermediate => scrapeGroupFromGroupPage(groupIntermediate, season, championship, loader));
  const groups: GroupMasterData[] = (await Promise.all(tasks)).flat();

  return groups;
}
