import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import type { Name, NamedEntity } from './Name';

export type SeasonID = ID<'Season'>;
export type Season = NamedEntity<SeasonID>;


export function parseFromName(name: Name): Season {
  return {
    id: parseID('Season', name.shortName),
    longName: name.longName,
    shortName: name.shortName,
  };
}
