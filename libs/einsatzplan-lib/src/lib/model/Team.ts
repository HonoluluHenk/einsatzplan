import type { Name } from '../types/Name';
import type { PhoneNumber } from '../types/PhoneNumber';
import type { EmailAddress } from '../types/EmailAddress';
import type { Venue, VenueID } from './Venue';
import type { PlayerID } from './Player';
import type { ID } from '../types/ID.type';

interface TeamContact {
  name: Name;
  phone: PhoneNumber;
  email: EmailAddress;
}

export type TeamID = ID<'Team'>;

export interface Team {
  id: TeamID;
  name: string;
  shortName: string;
  venues: Record<VenueID, Venue>;
  contact: TeamContact;
  defaultPlayers: PlayerID[];
}
