import { inject, Injectable } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ChampionshipFoo } from './model/Championship';
import { Player, PlayerID } from './model/Player';
import { TeamID } from './model/Team';
import { cleanPathSegmentForFirebaseKey } from './util/firebase-util';

@Injectable({providedIn: 'root'})
export class ClubPlayersService {
  readonly #db = inject(Database);

  eligiblePlayers$(
    championship: ChampionshipFoo,
    league: string,
    teamID: TeamID,
  ): Observable<Record<PlayerID, Player>> {
    const c = cleanPathSegmentForFirebaseKey(championship.backendId);
    const l = cleanPathSegmentForFirebaseKey(league);
    const t = cleanPathSegmentForFirebaseKey(teamID);

    const path = `/championships/${c}/leagues/${l}/teams/${t}/eligiblePlayers`;
    return objectVal<Record<PlayerID, Player>>(ref(this.#db, path));
  }
}
