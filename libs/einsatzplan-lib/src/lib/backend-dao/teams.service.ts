import { inject, Injectable } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { LeagueID } from '@einsatzplan/model/League';
import { Match, MatchID } from '@einsatzplan/model/Match';
import type { SeasonID } from '@einsatzplan/model/Season';
import { TeamID } from '@einsatzplan/model/Team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  readonly #db = inject(Database);

  matchesForTeam$(
    seasonID: SeasonID,
    championshipID: ChampionshipID,
    leagueID: LeagueID,
    teamID: TeamID,
  )
  {
    const path = `/seasons/${seasonID}/championships/${championshipID}/leagues/${leagueID}/teams/${teamID}/matches`;
    return objectVal<Record<MatchID, Match>>(ref(this.#db, path));
  }
}
