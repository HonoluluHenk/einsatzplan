import type { Database } from '@angular/fire/database';
import type { Player, PlayerID } from '@einsatzplan/model/Player';
import type { SeasonID } from '@einsatzplan/model/Season';
import type { TeamID } from '@einsatzplan/model/Team';
import { ref, set } from 'firebase/database';

export async function uploadPlayers(
  seasonID: SeasonID,
  players: Record<PlayerID, Player>,
  championship: string,
  league: string,
  teamID: TeamID,
  db: Database,
): Promise<Record<PlayerID, Player>> {
  const path = `/seasons/${seasonID}/championships/${championship}/leagues/${league}/teams/${teamID}/eligiblePlayers`;
  await set(ref(db, path), JSON.parse(JSON.stringify(players)));

  return players;
}
