import { ID } from '@einsatzplan/einsatzplan-lib/types/ID.type';

export type AddressID = ID<'Address'>;

export interface Address {
  id: AddressID;
  street: string;
  zip: string;
  city: string;
  country: string;
}
