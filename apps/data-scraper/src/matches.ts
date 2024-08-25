import type { Database } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import type { SeasonID } from '@einsatzplan/model/Season';
import type { TeamID } from '@einsatzplan/model/Team';
import { scrapeMatches } from './matches/scrapeMatches';
import { uploadMatches } from './matches/uploadMatches';

export async function matches(
  opts: {
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID,
    db: Database
  },
): Promise<void> {
  try {
    const matches = await scrapeMatches('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');
    await uploadMatches(opts.seasonID, matches, opts.championshipID, opts.leagueID, opts.teamID, opts.db);
    console.log('matches saved:', Object.values(matches).length);

  } catch (error) {
    console.error('matches failed: ', error);
    throw Error('matches failed');
  }
}
