import type { Database } from '@angular/fire/database';
import { ref, set } from 'firebase/database';
import type { ChampionshipLink } from '../index/ChampionshipLink';

export async function uploadChampionship(
  championship: ChampionshipLink,
  db: Database,
): Promise<void> {
  const path = ref(db, `seasons/${championship.season.id}/championships/${championship.id}/master-data`);

  await set(path, championship);
}
