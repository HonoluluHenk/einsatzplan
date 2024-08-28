import type { Database } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
import type { SeasonID } from '@einsatzplan/model/Season';
import type { Team, TeamID } from '@einsatzplan/model/Team';
import * as firebaseDB from 'firebase/database';
import { ref } from 'firebase/database';

export async function uploadTeams(
  seasonID: SeasonID,
  teams: Record<TeamID, Team>,
  championshipID: ChampionshipID,
  groupID: GroupID,
  db: Database,
): Promise<void> {
  for (const [id, team] of Object.entries(teams)) {
    const path = `/seasons/${seasonID}/championships/${championshipID}/groups/${groupID}/teams/${id}/teamMasterData`;
    await firebaseDB.set(ref(db, path), JSON.parse(JSON.stringify(team)));
  }
}
