import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Address } from './Address';

export type VenueID = ID<'Venue'>;

export interface Venue {
  id: VenueID;
  number: number;
  name: string;
  address: Address;
}
