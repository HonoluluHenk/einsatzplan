import { computed, Injectable, Signal } from '@angular/core';
import { type ChampionshipID } from '@einsatzplan/model/Championship';
import type { GroupID } from '@einsatzplan/model/GroupMasterData';
import type { SeasonID } from '@einsatzplan/model/Season';
import { TeamID } from '@einsatzplan/model/Team';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { BaseStore } from './store/base.store';

export type CurrentTeam = {
  seasonID: SeasonID,
  championshipID: ChampionshipID;
  groupID: GroupID;
  teamName: string;
  teamID: TeamID
};

interface CurrentTeamLibState {
  team: undefined | CurrentTeam;
}

@Injectable()
export class CurrentTeamStore extends BaseStore<CurrentTeamLibState> {
  constructor() {
    super({
      team: undefined,
    });
  }

  init(params: {
    seasonID: SeasonID,
    championshipID: ChampionshipID;
    groupID: GroupID;
    teamName: string
  })
  {
    this.patchState((_draft) => ({
      team: {
        seasonID: params.seasonID,
        championshipID: params.championshipID,
        groupID: params.groupID,
        teamName: params.teamName,
        teamID: parseID('Team', params.teamName),
      },
    }));
  }

  team: Signal<CurrentTeam> = computed(() =>
    requireValue(this.state().team, 'Store not initialized!'),
  );
}
