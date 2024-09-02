import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { Address } from './Address';

export type VenueID = ID<'Venue'>;

export type VenueName = {
  number: number;
  name: string;
}

export interface Venue extends VenueName {
  id: VenueID;
}

export interface VenueMasterData extends Venue {
  address: Address;
}
