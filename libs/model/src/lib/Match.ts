import type { ID } from '@einsatzplan/shared-util/types/ID.type';
import type { ISOLocalDateString } from '@einsatzplan/shared-util/types/ISOLocalDateString';
import type { ISOLocalTimeString } from '@einsatzplan/shared-util/types/ISOLocalTimeString';
import type { Championship } from './Championship';
import type { Group } from './GroupMasterData';
import type { Season } from './Season';
import type { TeamID } from './Team';
import type { VenueID } from './Venue';

export type MatchID = ID<'Match'>;

export interface Match {
  id: MatchID;
  homeTeamId: TeamID;
  opponentTeamId: TeamID;
  season: Season;
  championship: Championship;
  group: Group;
  venueId?: VenueID | undefined;
  date: ISOLocalDateString;
  startTime: ISOLocalTimeString;
  flags?: string | undefined;
}
