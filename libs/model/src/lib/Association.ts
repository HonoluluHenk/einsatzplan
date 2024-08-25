import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Name } from './Name';

export type AssociationID = ID<'Association'>;

export type AssociationName = Name;

export type Association = AssociationName & {
  id: AssociationID;
};

export type AssociationMasterData = Association & {
  // temporary placeholder to prevent confusion with Association
  foo: symbol;
}
