import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import type { Season } from './Season';

export type ChampionshipID = ID<'Championship'>;

/**
 * @deprecated Migrate to ChampionshipName or Championship
 */
export interface ChampionshipFoo {
  id: ChampionshipID;
  // FIXME: migrate to ChampionshipName
  name: string;
  backendId: string;
}

/**
 * e.g.: short: MTTV 24/25, long: MTTV 2024/2025
 */
export interface ChampionshipName {
  shortName: string;
  longName: string;
}

export type Championship = ChampionshipName & {
  id: ChampionshipID;
};

export type ChampionshipMasterData = Championship & {
  externalUrl: string;
  season: Season;
}

export function parseChampionshipFromName(name: string): ChampionshipFoo {
  const id = parseID('Championship', name);

  return {
    id,
    name,
    backendId: id,
  };
}
