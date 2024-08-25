import { inject, Injectable } from '@angular/core';
import { Database, type DatabaseReference, objectVal, ref, set } from '@angular/fire/database';
import { type ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import type { MatchID } from '@einsatzplan/model/Match';
import { PlannedMatchSetup, PlayerSetup } from '@einsatzplan/model/PlannedMatchSetup';
import { PlayerID } from '@einsatzplan/model/Player';
import type { SeasonID } from '@einsatzplan/model/Season';
import { TeamID } from '@einsatzplan/model/Team';
import { cleanPathForFirebaseKey, cleanPathSegmentForFirebaseKey } from '@einsatzplan/shared-util/firebase-util';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { Paths } from '@einsatzplan/shared-util/paths';
import type { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MatchSetupService {
  readonly #db = inject(Database);

  allTeamMatchesSetup$(
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID,
  ): Observable<Record<MatchID, PlannedMatchSetup> | undefined> {
    const ref = this.mkRef(seasonID, championshipID, leagueID, teamID);

    return objectVal<Record<MatchID, PlannedMatchSetup>>(ref);
  }

  async putPlayerSetup(
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID,
    matchID: MatchID,
    playerID: PlayerID,
    setup: PlayerSetup,
  ): Promise<void> {
    const ref = this.mkRef(seasonID, championshipID, leagueID, teamID, matchID, `players.${playerID}`);

    await set(ref, JSON.parse(JSON.stringify(setup)));
  }


  private mkRef(
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID,
    matchID?: MatchID,
    propertyPath?: Paths<PlannedMatchSetup>,
  ): DatabaseReference {

    let path =
      `/seasons${seasonID}/championships/${championshipID}/leagues/${leagueID}/teams/${teamID}/plannedMatchSetup`;
    if (matchID) {
      const m = cleanPathSegmentForFirebaseKey(matchID);
      path = `${path}/${m}`;
    }
    if (propertyPath) {
      // FIXME: should implement this with an overload
      requireValue(matchID, 'matchID is required for propertyPath');
      path = `${path}/${cleanPathForFirebaseKey(propertyPath)}`;
    }

    return ref(this.#db, path);
  }
}
