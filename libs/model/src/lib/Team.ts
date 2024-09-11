import type { EmailAddress } from '@einsatzplan/shared-util/types/EmailAddress';
import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { PhoneNumber } from '@einsatzplan/shared-util/types/PhoneNumber';
import type { PlayerName } from './PlayerName';
import type { VenueID, VenueMasterData } from './Venue';

export interface TeamContact {
  name: PlayerName;
  phone: PhoneNumber | '';
  email: EmailAddress | '';
}

export type TeamID = ID<'Team'>;

// FIXME: convert to NamedEntity
export interface Team {
  id: TeamID;
  name: string;
  shortName: string;
  venues: Record<VenueID, VenueMasterData>;
  contact: TeamContact;
  url: string;
}
