import type { Database } from '@angular/fire/database';
import type { Player, PlayerID, TeamID } from '@einsatzplan/einsatzplan-lib/model';
import { groupingBy } from '@einsatzplan/einsatzplan-lib/util/list-util';
import { ref, set } from 'firebase/database';
import { parsePlayersFromCsv } from './parsePlayersFromCsv';

export async function scrapePlayers(
  ...paths: string[]
): Promise<Record<PlayerID, Player>> {
  const playerArrays = await Promise.all(paths.map(p => parsePlayersFromCsv(p)));

  const players = playerArrays.flat()
    .reduce(groupingBy('id'), {});

  return Promise.resolve(players);
}


export async function uploadPlayers(
  players: Record<PlayerID, Player>,
  championship: string,
  league: string,
  teamID: TeamID,
  db: Database,
): Promise<Record<PlayerID, Player>> {
  const path = `/championships/${championship}/leagues/${league}/teams/${teamID}/eligible-players`;
  await set(ref(db, path), JSON.parse(JSON.stringify(players)));

  return players;
}
