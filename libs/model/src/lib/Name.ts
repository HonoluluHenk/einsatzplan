import type { ID } from '@einsatzplan/shared-util/types/ID.type';

export type Name = {
  shortName: string;
  longName: string;
}

export interface NamedEntity<Id extends ID<string>> extends Name {
  id: Id;
}

export function stripToNamedEntity<Id extends ID<string>>(input: NamedEntity<Id>): NamedEntity<Id> {
  return {
    id: input.id,
    shortName: input.shortName,
    longName: input.longName,
  };
}
