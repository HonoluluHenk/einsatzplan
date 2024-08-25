import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import type { TeamID } from '@einsatzplan/model/Team';
import type { ScraperContext } from '../ScraperContext';
import { scrapePlayers } from './scrapePlayers';
import { uploadPlayers } from './uploadPlayers';

export async function players(
  context: ScraperContext,
  opts: {
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID
  },
): Promise<void> {
  try {
    const players = await scrapePlayers(
      './data/club/33282/players/players-female.csv',
      './data/club/33282/players/players-male.csv',
    );

    await uploadPlayers(context.season.id, players, opts.championshipID, opts.leagueID, opts.teamID, context.db);

    console.log('players saved:', Object.values(players).length);
  } catch (error) {
    console.error('players failed: ', error);
    throw Error('players failed');
  }
}
