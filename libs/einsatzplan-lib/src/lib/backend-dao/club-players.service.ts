import { inject, Injectable } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { type ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import { Player, PlayerID } from '@einsatzplan/model/Player';
import type { SeasonID } from '@einsatzplan/model/Season';
import { TeamID } from '@einsatzplan/model/Team';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ClubPlayersService {
  readonly #db = inject(Database);

  eligiblePlayers$(
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID,
  ): Observable<Record<PlayerID, Player>> {

    const path = `/seasons/${seasonID}/championships/${championshipID}/leagues/${leagueID}/teams/${teamID}/eligiblePlayers`;
    return objectVal<Record<PlayerID, Player>>(ref(this.#db, path));
  }
}
