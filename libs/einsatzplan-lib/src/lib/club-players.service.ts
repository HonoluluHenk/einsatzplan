import { inject, Injectable } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { ChampionshipFoo } from '@einsatzplan/model/Championship';
import { Player, PlayerID } from '@einsatzplan/model/Player';
import { TeamID } from '@einsatzplan/model/Team';
import { cleanPathSegmentForFirebaseKey } from '@einsatzplan/shared-util/firebase-util';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClubPlayersService {
  readonly #db = inject(Database);

  eligiblePlayers$(
    championship: ChampionshipFoo,
    league: string,
    teamID: TeamID,
  ): Observable<Record<PlayerID, Player>> {
    console.log('championship', championship);
    const c = cleanPathSegmentForFirebaseKey(championship.backendId);
    const l = cleanPathSegmentForFirebaseKey(league);
    const t = cleanPathSegmentForFirebaseKey(teamID);

    const path = `/championships/${c}/leagues/${l}/teams/${t}/eligiblePlayers`;
    return objectVal<Record<PlayerID, Player>>(ref(this.#db, path));
  }
}
