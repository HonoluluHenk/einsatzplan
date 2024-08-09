import {inject, Injectable} from "@angular/core";
import {Database, objectVal, ref} from "@angular/fire/database";
import {Championship, Player} from "@einsatzplan/einsatzplan-lib/model";
import {Observable} from "rxjs";
import {cleanPathForFirebaseKey} from "@einsatzplan/einsatzplan-lib/util/firebase-util";
import {ID} from "@einsatzplan/einsatzplan-lib/types/ID.type";

@Injectable({providedIn: 'root'})
export class ClubPlayersService {
  readonly #db = inject(Database);

  eligiblePlayers$(championship: Championship, league: string, teamName: string): Observable<Record<ID<'Player'>, Player>> {
    const c = cleanPathForFirebaseKey(championship.backendId);
    const l = cleanPathForFirebaseKey(league);
    const t = cleanPathForFirebaseKey(teamName);

    const path = `/championship/${c}/leagues/${l}/teams/${t}/eligible-players`;
    return objectVal<Record<ID<'Player'>, Player>>(ref(this.#db, path))
  }
}
