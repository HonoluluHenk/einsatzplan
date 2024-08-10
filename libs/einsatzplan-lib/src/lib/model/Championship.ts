import type { ID } from '../types/ID.type';
import { parseID } from '../types/ID.type';
import { cleanName } from '../util/cleanName';

export type ChampionshipID = ID<'Championship'>;

export interface Championship {
  id: ChampionshipID;
  name: string;
  backendId: string;
}

export function parseChampionshipFromName(name: string): Championship {
  const clean = cleanName(name);
  return {
    id: parseID('Championship', clean),
    name,
    backendId: clean,
  };
}
