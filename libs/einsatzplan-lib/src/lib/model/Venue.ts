import type { Address } from './Address';
import type { ID } from '../types/ID.type';

export type VenueID = ID<'Venue'>;

export interface Venue {
  id: VenueID;
  number: number;
  name: string;
  address: Address;
  directions?: string | undefined;
}
