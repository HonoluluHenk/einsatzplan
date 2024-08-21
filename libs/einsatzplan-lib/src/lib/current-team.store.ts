import { computed, Injectable, Signal } from '@angular/core';
import { Championship, parseChampionshipFromName } from './model/Championship';
import { TeamID } from './model/Team';
import { BaseStore } from './store/base.store';
import { parseID } from './types/ID.type';
import { requireValue } from './util/nullish';

export type CurrentTeam = {
  championship: Championship;
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
