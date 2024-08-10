import { BaseStore } from './store/base.store';
import { computed, Injectable, Signal } from '@angular/core';
import { requireValue } from './util/nullish';
import { Championship, parseChampionshipFromName } from './model/Championship';

export type CurrentTeam = {
  championship: Championship;
  league: string;
  teamName: string;
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

  init(params: { championship: string; league: string; teamName: string }) {
    console.debug('Team: ', params);
    this.patchState((_draft) => ({
      team: {
        championship: parseChampionshipFromName(params.championship),
        league: params.league,
        teamName: params.teamName,
      },
    }));
  }

  team: Signal<CurrentTeam> = computed(() =>
    requireValue(this.state().team, 'Store not initialized!')
  );
}
