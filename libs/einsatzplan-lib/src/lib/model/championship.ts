import { createID, ID } from '@einsatzplan/einsatzplan-lib/types/ID.type';
import { cleanName } from '@einsatzplan/einsatzplan-lib/util/cleanName';

export type ChampionshipID = ID<'Championship'>;

export interface Championship {
  id: ChampionshipID;
  name: string;
  backendId: string;
}

export function parseChampionshipFromName(name: string): Championship {
  const clean = cleanName(name);
  return {
    id: createID('Championship', clean),
    name,
    backendId: clean,
  };
}
