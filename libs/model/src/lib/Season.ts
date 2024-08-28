import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import type { Name } from './Name';

export type SeasonID = ID<'Season'>;

/**
 * @example
 * {
 *  shortName: '24/25',
 *  longName: '2024/25'
 * }
 */
export type SeasonName = Name;

export interface Season extends SeasonName {
  id: SeasonID;
}

export interface SeasonMasterData extends Season {
  // temporary placeholder to prevent confusion with Season
  foo: symbol;
}

export function parseFromName(name: SeasonName): Season {
  return {
    id: parseID('Season', name.shortName),
    longName: name.longName,
    shortName: name.shortName,
  };
}
