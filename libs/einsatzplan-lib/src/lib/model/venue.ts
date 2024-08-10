import { Address } from './address';
import { ID } from '@einsatzplan/einsatzplan-lib/types/ID.type';

export type VenueID = ID<'Venue'>;

export interface Venue {
  id: VenueID;
  number: number;
  name: string;
  address: Address;
  directions?: string | undefined;
}
