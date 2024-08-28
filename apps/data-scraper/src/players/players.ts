import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
import type { Player, PlayerID } from '@einsatzplan/model/Player';
import type { TeamID } from '@einsatzplan/model/Team';
import type { ScraperContext } from '../ScraperContext';
import { scrapePlayers } from './scrapePlayers';
import { uploadPlayers } from './uploadPlayers';

export async function players(
  context: ScraperContext,
  opts: {
    championshipID: ChampionshipID,
    groupID: GroupID,
    teamID: TeamID
  },
): Promise<Record<PlayerID, Player>> {
  try {
    const players = await scrapePlayers(
      './data/club/33282/players/players-female.csv',
      './data/club/33282/players/players-male.csv',
    );

    await uploadPlayers(context.season.id, players, opts.championshipID, opts.groupID, opts.teamID, context.db);

    console.log('players saved:', Object.values(players).length);
    return players;

  } catch (error) {
    console.error('players failed: ', error);
    throw Error('players failed');
  }
}
