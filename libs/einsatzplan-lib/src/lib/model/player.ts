import { Name } from '@einsatzplan/einsatzplan-lib/types/Name';
import { PhoneNumber } from '@einsatzplan/einsatzplan-lib/types/PhoneNumber';
import { EmailAddress } from '@einsatzplan/einsatzplan-lib/types/EmailAddress';
import { ID } from '@einsatzplan/einsatzplan-lib/types/ID.type';

export type PlayerID = ID<'Player'>;

export interface Player {
  id: PlayerID;
  name: Name;
  sex: 'M' | 'F';
  maleClassification: string;
  femaleClassification: string | undefined;
  phone: PhoneNumber | undefined;
  email: EmailAddress | undefined;
  googleCalendarId: string | undefined;
  appleCalendarId: string | undefined;
}
