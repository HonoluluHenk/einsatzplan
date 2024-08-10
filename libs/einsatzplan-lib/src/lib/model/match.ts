import { ISOLocalTimeString } from '@einsatzplan/einsatzplan-lib/types/ISOLocalTimeString';
import { ISOLocalDateString } from '@einsatzplan/einsatzplan-lib/types/ISOLocalDateString';
import { ID } from '@einsatzplan/einsatzplan-lib/types/ID.type';
import { TeamID } from '@einsatzplan/einsatzplan-lib/model/team';
import { VenueID } from '@einsatzplan/einsatzplan-lib/model/venue';

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
