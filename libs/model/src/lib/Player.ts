import type { EmailAddress } from '@einsatzplan/shared-util/types/EmailAddress';
import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { PhoneNumber } from '@einsatzplan/shared-util/types/PhoneNumber';
import type { PlayerName } from './PlayerName';

export type PlayerID = ID<'Player'>;

export interface Player {
  id: PlayerID;
  name: PlayerName;
  sex: 'M' | 'F';
  maleClassification: string;
  femaleClassification: string | undefined;
  phone: PhoneNumber | undefined;
  email: EmailAddress | undefined;
  googleCalendarId: string | undefined;
  appleCalendarId: string | undefined;
}
