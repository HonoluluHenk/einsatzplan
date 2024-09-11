import type { Match, MatchID } from '@einsatzplan/model/Match';
import { groupingBy } from '@einsatzplan/shared-util/list-util';
import type { ScraperContext } from '../ScraperContext';
import { withTracing } from '../utils/withTracing';
import { scrapeMatchesFromGroupPage } from './scrapeMatchesFromGroupPage';
import { uploadMatches } from './uploadMatches';

export async function matches(
  context: ScraperContext,
): Promise<Record<MatchID, Match>> {
  return withTracing('matches', async () => {
    try {
      const matchesTasks = Object.values(context.parsed.groupMD)
        .map(async group => {
          return await scrapeMatchesFromGroupPage(
            group.season,
            group.championship,
            context.parsed.groups[group.id],
            group.clickTTUrl,
            context.loader,
          );
        });
      const matches = (await Promise.all(matchesTasks))
        .flat();

      // FIXME: suboptimal: should upload Matches by group
      await uploadMatches(matches, context.db);

      console.log('matches saved:', Object.values(matches).length);

      return matches.reduce(groupingBy('id'), {});

    } catch (error) {
      console.error('matches failed: ', error);
      throw Error('matches failed');
    }

  });
}
