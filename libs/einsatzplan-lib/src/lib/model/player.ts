import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {Name} from "@einsatzplan/einsatzplan-lib/types/Name";
import {PhoneNumber} from "@einsatzplan/einsatzplan-lib/types/PhoneNumber";
import {EmailAddress} from "@einsatzplan/einsatzplan-lib/types/EmailAddress";

export interface Player {
  id: ID<'Player'>;
  name: Name;
  sex: 'M' | 'F';
  maleClassification: string;
  femaleClassification: string | undefined;
  phone: PhoneNumber | undefined;
  email: EmailAddress | undefined;
  googleCalendarId: string | undefined;
  appleCalendarId: string | undefined;
}
