import { inject, Injectable } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import type { ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
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
    groupID: GroupID,
    teamID: TeamID,
  )
  {
    const path = `/seasons/${seasonID}/championships/${championshipID}/groups/${groupID}/teams/${teamID}/matches`;
    return objectVal<Record<MatchID, Match>>(ref(this.#db, path));
  }
}
