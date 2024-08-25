import type { Database } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import type { SeasonID } from '@einsatzplan/model/Season';
import type { TeamID } from '@einsatzplan/model/Team';
import { scrapePlayers } from './players/scrapePlayers';
import { uploadPlayers } from './players/uploadPlayers';

export async function players(
  opts: {
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID
    db: Database
  },
): Promise<void> {
  try {
    const players = await scrapePlayers(
      './data/club/33282/players/players-female.csv',
      './data/club/33282/players/players-male.csv',
    );
    await uploadPlayers(opts.seasonID, players, opts.championshipID, opts.leagueID, opts.teamID, opts.db);
    console.log('players saved:', Object.values(players).length);


  } catch (error) {
    console.error('players failed: ', error);
    throw Error('players failed');
  }
}
