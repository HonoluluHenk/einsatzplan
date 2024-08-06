import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {Name} from "@einsatzplan/einsatzplan-lib/types/Name";
import {PhoneNumber} from "@einsatzplan/einsatzplan-lib/types/PhoneNumber";
import {EmailAddress} from "@einsatzplan/einsatzplan-lib/types/EmailAddress";

export interface Player {
  id: ID<'Player'>;
  name: Name;
  phone: PhoneNumber | undefined;
  mail: EmailAddress | undefined;
  googleCalendarId: string | undefined;
  appleCalendarId: string | undefined;
}
