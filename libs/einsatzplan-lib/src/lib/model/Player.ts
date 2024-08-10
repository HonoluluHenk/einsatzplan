import type { Name } from '../types/Name';
import type { PhoneNumber } from '../types/PhoneNumber';
import type { EmailAddress } from '../types/EmailAddress';
import type { ID } from '../types/ID.type';

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
