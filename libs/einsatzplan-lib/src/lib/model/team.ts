import { Name } from '@einsatzplan/einsatzplan-lib/types/Name';
import { PhoneNumber } from '@einsatzplan/einsatzplan-lib/types/PhoneNumber';
import { EmailAddress } from '@einsatzplan/einsatzplan-lib/types/EmailAddress';
import { Venue, VenueID } from './venue';
import { PlayerID } from '@einsatzplan/einsatzplan-lib/model/player';
import { ID } from '@einsatzplan/einsatzplan-lib/types/ID.type';

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
