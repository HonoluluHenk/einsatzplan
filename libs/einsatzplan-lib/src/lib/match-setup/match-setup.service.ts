import { inject, Injectable } from '@angular/core';
import { Database, type DatabaseReference, objectVal, ref, set } from '@angular/fire/database';
import type { Observable } from 'rxjs';
import { MatchID } from '../model';
import { ChampionshipFoo } from '../model/Championship';
import { PlannedMatchSetup, PlayerSetup } from '../model/PlannedMatchSetup';
import { PlayerID } from '../model/Player';
import { TeamID } from '../model/Team';
import { cleanPathForFirebaseKey, cleanPathSegmentForFirebaseKey } from '../util/firebase-util';
import { requireValue } from '../util/nullish';
import { Paths } from '../util/paths';


@Injectable({
  providedIn: 'root',
})
export class MatchSetupService {
  readonly #db = inject(Database);

  allTeamMatchesSetup$(
    championship: ChampionshipFoo,
    league: string,
    teamID: TeamID,
  ): Observable<Record<MatchID, PlannedMatchSetup> | undefined> {
    const ref = this.mkRef(championship, league, teamID);

    return objectVal<Record<MatchID, PlannedMatchSetup>>(ref);
  }

  async putPlayerSetup(
    championship: ChampionshipFoo,
    league: string,
    teamID: TeamID,
    matchID: MatchID,
    playerID: PlayerID,
    setup: PlayerSetup,
  ): Promise<void> {
    const ref = this.mkRef(championship, league, teamID, matchID, `players.${playerID}`);

    await set(ref, JSON.parse(JSON.stringify(setup)));
  }


  private mkRef(
    championship: ChampionshipFoo,
    league: string,
    teamID: TeamID,
    matchID?: MatchID,
    propertyPath?: Paths<PlannedMatchSetup>,
  ): DatabaseReference {

    const c = cleanPathSegmentForFirebaseKey(championship.backendId);
    const l = cleanPathSegmentForFirebaseKey(league);
    const t = cleanPathSegmentForFirebaseKey(teamID);

    let path = `/championships/${c}/leagues/${l}/teams/${t}/plannedMatchSetup`;
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
