import { computed, Injectable, Signal } from '@angular/core';
import { ChampionshipFoo, parseChampionshipFromName } from '@einsatzplan/model/Championship';
import { TeamID } from '@einsatzplan/model/Team';
import { requireValue } from '@einsatzplan/shared-util/nullish';
import { parseID } from '@einsatzplan/shared-util/types/ID.type';
import { BaseStore } from './store/base.store';

export type CurrentTeam = {
  championship: ChampionshipFoo;
  league: string;
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
    championship: string;
    league: string;
    teamName: string
  })
  {
    this.patchState((_draft) => ({
      team: {
        championship: parseChampionshipFromName(params.championship),
        league: params.league,
        teamName: params.teamName,
        teamID: parseID('Team', params.teamName),
      },
    }));
  }

  team: Signal<CurrentTeam> = computed(() =>
    requireValue(this.state().team, 'Store not initialized!'),
  );
}
