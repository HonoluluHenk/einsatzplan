import type { Championship } from '@einsatzplan/model/Championship';
import type { Group } from '@einsatzplan/model/GroupMasterData';
import type { Match } from '@einsatzplan/model/Match';
import type { Season } from '@einsatzplan/model/Season';
import type { FileLoader } from '../utils/FileLoader';
import { withTracing } from '../utils/withTracing';
import { scrapeMatchesFromGroupMatchesPage } from './scrapeMatchesFromGroupMatchesPage';
import { scrapeMatchesPageUrlFromGroupPage } from './scrapeMatchesPageUrlFromGroupPage';

export async function scrapeMatchesFromGroupPage(
  season: Season,
  championship: Championship,
  group: Group,
  groupPageUrl: string,
  loader: FileLoader,
): Promise<Match[]> {
  return withTracing('scrapeMatchesFromGroupPage', async () => {

    const matchesPageUrl = await scrapeMatchesPageUrlFromGroupPage(groupPageUrl, loader);

    const matches = await scrapeMatchesFromGroupMatchesPage(season, championship, group, matchesPageUrl, loader);

    return matches;
  });
}
