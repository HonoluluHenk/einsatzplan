import type { ID } from '../types/ID.type';

export type AssociationID = ID<'Association'>;

export type AssociationName = {
  shortName: string;
  longName: string;
}

export type Association = AssociationName & {
  id: AssociationID;
};

export type AssociationMasterData = Association & {
  // temporary placeholder to prevent confusion with Association
  foo: symbol;
}
