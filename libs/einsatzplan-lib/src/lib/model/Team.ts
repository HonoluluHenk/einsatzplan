import type { EmailAddress } from '../types/EmailAddress';
import type { ID } from '../types/ID.type';
import type { PhoneNumber } from '../types/PhoneNumber';
import type { Name } from './Name';
import type { Venue, VenueID } from './Venue';

export interface TeamContact {
  name: Name;
  phone: PhoneNumber | '';
  email: EmailAddress | '';
}

export type TeamID = ID<'Team'>;

export interface Team {
  id: TeamID;
  name: string;
  shortName: string;
  venues: Record<VenueID, Venue>;
  contact: TeamContact;
  url: string;
}
