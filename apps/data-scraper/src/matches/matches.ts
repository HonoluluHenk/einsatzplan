import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import type { TeamID } from '@einsatzplan/model/Team';
import type { ScraperContext } from '../ScraperContext';
import { scrapeMatches } from './scrapeMatches';
import { uploadMatches } from './uploadMatches';

export async function matches(
  context: ScraperContext,
  opts: {
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID,
  },
): Promise<void> {
  try {
    const matches = await scrapeMatches('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');

    await uploadMatches(context.season.id, matches, opts.championshipID, opts.leagueID, opts.teamID, context.db);

    console.log('matches saved:', Object.values(matches).length);
  } catch (error) {
    console.error('matches failed: ', error);
    throw Error('matches failed');
  }
}
