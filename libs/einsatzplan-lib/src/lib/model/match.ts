import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";
import {ISOLocalTimeString} from "@einsatzplan/einsatzplan-lib/types/ISOLocalTimeString";
import {Player} from "./player";
import {ISOLocalDateString} from "@einsatzplan/einsatzplan-lib/types/ISOLocalDateString";

export interface Match {
  id: ID<'Match'>;
  homeTeamId: ID<'Team'>;
  opponentTeamId: ID<'Team'>;
  venueId: ID<'Venue'>;
  date: ISOLocalDateString;
  startTime: ISOLocalTimeString;
  flags?: string | undefined;
  plannedSetup?: MatchSetup | undefined;
}

export interface MatchSetup {
  homePlayers: Player[];
  opponentPlayers: Player[];
}
