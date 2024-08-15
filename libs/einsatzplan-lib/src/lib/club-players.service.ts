import { inject, Injectable } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Championship } from './model/Championship';
import { Player, PlayerID } from './model/Player';
import { TeamID } from './model/Team';
import { cleanPathForFirebaseKey } from './util/firebase-util';

@Injectable({providedIn: 'root'})
export class ClubPlayersService {
  readonly #db = inject(Database);

  eligiblePlayers$(
    championship: Championship,
    league: string,
    teamID: TeamID,
  ): Observable<Record<PlayerID, Player>> {
    const c = cleanPathForFirebaseKey(championship.backendId);
    const l = cleanPathForFirebaseKey(league);
    const t = cleanPathForFirebaseKey(teamID);

    const path = `/championships/${c}/leagues/${l}/teams/${t}/eligible-players`;
    return objectVal<Record<PlayerID, Player>>(ref(this.#db, path));
  }
}
