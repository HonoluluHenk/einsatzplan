import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { ISOLocalDateString } from '@einsatzplan/shared-util/types/ISOLocalDateString';
import type { ISOLocalTimeString } from '@einsatzplan/shared-util/types/ISOLocalTimeString';
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
