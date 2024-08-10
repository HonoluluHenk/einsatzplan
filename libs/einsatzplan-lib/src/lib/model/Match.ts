import type { ISOLocalTimeString } from '../types/ISOLocalTimeString';
import type { ISOLocalDateString } from '../types/ISOLocalDateString';
import type { ID } from '../types/ID.type';
import type { TeamID } from './Team';
import type { VenueID } from './Venue';

export type MatchID = ID<'Match'>;

export interface Match {
  id: MatchID;
  homeTeamId: TeamID;
  opponentTeamId: TeamID;
  venueId: VenueID;
  date: ISOLocalDateString;
  startTime: ISOLocalTimeString;
  flags?: string | undefined;
}
