import type { GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import type { FileLoader } from '../utils/FileLoader';
import { scrapeGroupFromGroupPage } from './scrapeGroupFromGroupPage';
import { scrapeGroupIntermediatesFromLigenplan } from './scrapeGroupIntermediatesFromLigenplan';

export async function scrapeGroupsFromLigenplan(
  url: string,
  loader: FileLoader,
): Promise<GroupMasterData[]> {
  const groupIntermediates = await scrapeGroupIntermediatesFromLigenplan(url, loader);

  const tasks = groupIntermediates.map(groupIntermediate => scrapeGroupFromGroupPage(groupIntermediate, loader));
  const groups: GroupMasterData[] = (await Promise.all(tasks)).flatMap(nested => nested);

  return groups;
}
