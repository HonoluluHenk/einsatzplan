import type { Database } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupMasterData } from '@einsatzplan/model/GroupMasterData';
import type { SeasonID } from '@einsatzplan/model/Season';
import * as firebaseDB from 'firebase/database';
import { ref } from 'firebase/database';

export async function uploadGroups(
  seasonID: SeasonID,
  championshipID: ChampionshipID,
  groups: GroupMasterData[],
  db: Database,
): Promise<void> {
  for (const group of groups) {
    const path = `/seasons/${seasonID}/championships/${championshipID}/groups/${group.id}/master-data`;
    await firebaseDB.set(ref(db, path), JSON.parse(JSON.stringify(group)));
  }
}
