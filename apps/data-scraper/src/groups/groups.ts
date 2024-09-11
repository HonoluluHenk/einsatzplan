import type { GroupID, GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import { groupingBy } from '@einsatzplan/shared-util/list-util';
import type { ScraperContext } from '../ScraperContext';
import { scrapeGroupsFromLigenplan } from './scrapeGroupsFromLigenplan';
import { uploadGroups } from './uploadGroups';

export async function groups(
  context: ScraperContext,
): Promise<Record<GroupID, GroupMasterData>> {
  try {
    const championships = Object.values(context.parsed.championshipMD);

    const groupTasks = championships
      .map(championship => scrapeGroupsFromLigenplan(
        championship.clickTTLigenplanUrl,
        championship.season,
        context.parsed.championships[championship.id],
        context.loader)
        .then(groups => ({championship, groups})));
    const groupsInChampionship = (await Promise.all(groupTasks));

    for (const entry of groupsInChampionship) {
      await uploadGroups(entry.championship.season.id, entry.championship.id, entry.groups, context.db);
    }


    const groups = groupsInChampionship.flatMap(nested => nested.groups);
    console.log('groups saved:', groups.length);
    return groups.reduce(groupingBy('id'), {});

  } catch (error) {
    console.error('groups failed: ', error);
    throw Error('groups failed');
  }
}
