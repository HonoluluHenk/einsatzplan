import type { Database } from '@angular/fire/database';
import type { TeamID } from '@einsatzplan/einsatzplan-lib/model';
import { scrapePlayers, uploadPlayers } from './players/players-scraper';

export async function players(
  {championship, league, teamID, db}: {
    championship: string,
    league: string,
    teamID: TeamID
    db: Database
  },
): Promise<void> {
  try {
    const players = await scrapePlayers(
      './data/club/33282/players/players-female.csv',
      './data/club/33282/players/players-male.csv',
    );
    await uploadPlayers(players, championship, league, teamID, db);
    console.log('players saved:', Object.values(players).length);


  } catch (error) {
    console.error('players failed: ', error);
    throw Error('players failed');
  }
}
