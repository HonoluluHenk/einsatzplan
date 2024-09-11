import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { NamedEntity } from './Name';

export type AssociationID = ID<'Association'>;
export type Association = NamedEntity<AssociationID>;

export interface AssociationMasterData extends Association {
  // temporary placeholder to prevent confusion with Association
  foo: symbol;
}
