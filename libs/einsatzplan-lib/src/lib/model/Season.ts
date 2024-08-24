import { type ID, parseID } from '../types/ID.type';

export type SeasonID = ID<'Season'>;

/**
 * @example
 * {
 *  shortName: '24/25',
 *  longName: '2024/25'
 * }
 */
export type SeasonName = {
  shortName: string;
  longName: string;
}

export type Season = SeasonName & {
  id: SeasonID;
}

export type SeasonMasterData = Season & {
  // temporary placeholder to prevent confusion with Season
  foo: symbol
}

export function parseFromName(name: SeasonName): Season {
  return {
    id: parseID('Season', name.shortName),
    longName: name.longName,
    shortName: name.shortName,
  };
}
