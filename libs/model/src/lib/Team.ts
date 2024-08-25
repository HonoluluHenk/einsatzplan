import type { EmailAddress } from '@einsatzplan/shared-util/types/EmailAddress';
import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { PhoneNumber } from '@einsatzplan/shared-util/types/PhoneNumber';
import type { PlayerName } from './PlayerName';
import type { Venue, VenueID } from './Venue';

export interface TeamContact {
  name: PlayerName;
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
