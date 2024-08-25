import type { ID } from '@einsatzplan/shared-util/types/ID.type';

export type AddressID = ID<'Address'>;

export interface Address {
  street: string;
  zip: string;
  city: string;
}
