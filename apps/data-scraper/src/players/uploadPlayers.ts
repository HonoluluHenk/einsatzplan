import type { Database } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
import type { Player, PlayerID } from '@einsatzplan/model/Player';
import type { SeasonID } from '@einsatzplan/model/Season';
import type { TeamID } from '@einsatzplan/model/Team';
import { ref, set } from 'firebase/database';

export async function uploadPlayers(
  seasonID: SeasonID,
  players: Record<PlayerID, Player>,
  championshipID: ChampionshipID,
  groupID: GroupID,
  teamID: TeamID,
  db: Database,
): Promise<Record<PlayerID, Player>> {
  const path = `/seasons/${seasonID}/championships/${championshipID}/groups/${groupID}/teams/${teamID}/eligiblePlayers`;
  await set(ref(db, path), JSON.parse(JSON.stringify(players)));

  return players;
}
