import type { ID } from '../types/ID.type';
import type { Address } from './Address';

export type VenueID = ID<'Venue'>;

export interface Venue {
  id: VenueID;
  number: number;
  name: string;
  address: Address;
}
