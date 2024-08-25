import type { Database } from '@angular/fire/database';
import type { TeamID } from '@einsatzplan/model/Team';
import { scrapeMatches, uploadMatches } from './matches/matches-scraper';

export async function matches(
  {championship, league, teamID, db}: {
    championship: string,
    league: string,
    teamID: TeamID,
    db: Database
  },
): Promise<void> {
  try {
    const matches = await scrapeMatches('./data/club/33282/teams/OM3/getTeamMeetingsWebcal.ics');
    await uploadMatches(matches, championship, league, teamID, db);
    console.log('matches saved:', Object.values(matches).length);

  } catch (error) {
    console.error('matches failed: ', error);
    throw Error('matches failed');
  }
}
