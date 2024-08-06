import {Player} from "./player";
import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {Name} from "@einsatzplan/einsatzplan-lib/types/Name";
import {PhoneNumber} from "@einsatzplan/einsatzplan-lib/types/PhoneNumber";
import {EmailAddress} from "@einsatzplan/einsatzplan-lib/types/EmailAddress";
import {Venue} from "./venue";

interface TeamContact {
  name: Name;
  phone: PhoneNumber;
  email: EmailAddress;
}

export interface Team {
  id: ID<'Team'>;
  name: string;
  shortName: string;
  venues: Venue[];
  contact: TeamContact,
  defaultPlayers: Player[];
}
