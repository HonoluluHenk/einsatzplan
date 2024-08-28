import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
import type { Match, MatchID } from '@einsatzplan/model/Match';
import type { TeamID } from '@einsatzplan/model/Team';
import type { ScraperContext } from '../ScraperContext';
import { scrapeMatches } from './scrapeMatches';
import { uploadMatches } from './uploadMatches';

export async function matches(
  context: ScraperContext,
  opts: {
    championshipID: ChampionshipID,
    groupID: GroupID,
    teamID: TeamID,
  },
): Promise<Record<MatchID, Match>> {
  try {
    const matches = await scrapeMatches('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');

    await uploadMatches(context.season.id, matches, opts.championshipID, opts.groupID, opts.teamID, context.db);

    console.log('matches saved:', Object.values(matches).length);

    return matches;

  } catch (error) {
    console.error('matches failed: ', error);
    throw Error('matches failed');
  }
}
