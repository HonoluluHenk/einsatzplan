import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Season } from './Season';

export type ChampionshipID = ID<'Championship'>;

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
