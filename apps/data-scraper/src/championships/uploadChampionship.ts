import type { Database } from '@angular/fire/database';
import type { ChampionshipMasterData } from '@einsatzplan/model/Championship';
import { ref, set } from 'firebase/database';

export async function uploadChampionship(
  championship: ChampionshipMasterData,
  db: Database,
): Promise<void> {
  const path = ref(db, `seasons/${championship.season.id}/championships/${championship.id}/master-data`);

  await set(path, championship);
}
