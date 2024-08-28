import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Name } from './Name';

export type AssociationID = ID<'Association'>;

export type AssociationName = Name;

export interface Association extends AssociationName {
  id: AssociationID;
}

export interface AssociationMasterData extends Association {
  // temporary placeholder to prevent confusion with Association
  foo: symbol;
}
