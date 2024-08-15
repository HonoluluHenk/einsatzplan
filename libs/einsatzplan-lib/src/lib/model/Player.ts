import type { EmailAddress } from '../types/EmailAddress';
import type { ID } from '../types/ID.type';
import type { PhoneNumber } from '../types/PhoneNumber';
import type { Name } from './Name';

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
