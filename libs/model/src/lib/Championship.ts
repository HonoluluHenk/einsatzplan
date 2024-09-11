import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { NamedEntity } from './Name';
import type { Season } from './Season';

export type ChampionshipID = ID<'Championship'>;
export type Championship = NamedEntity<ChampionshipID>;

export interface ChampionshipMasterData extends Championship {
  clickTTLigenplanUrl: string;
  season: Season;
}
