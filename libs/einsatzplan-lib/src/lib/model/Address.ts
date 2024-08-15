import type { ID } from '../types/ID.type';

export type AddressID = ID<'Address'>;

export interface Address {
  street: string;
  zip: string;
  city: string;
}
