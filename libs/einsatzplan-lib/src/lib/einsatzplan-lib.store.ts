import {BaseStore} from "@einsatzplan/einsatzplan-lib/store/base.store";
import {computed, Injectable, Signal} from "@angular/core";
import {requireValue} from "@einsatzplan/einsatzplan-lib/util/nullish";
import {Championship, parseChampionshipFromName} from "@einsatzplan/einsatzplan-lib/model";

export type CurrentTeam = {
  teamName: string;
  championship: Championship;
};

interface EinsatzplanLibState {
  team: undefined | CurrentTeam
}

@Injectable()
export class EinsatzplanLibStore extends BaseStore<EinsatzplanLibState> {
  constructor() {
    super({
      team: undefined
    });
  }

  initFromRoute(championship: string, teamName: string) {
    console.log('Team: ', championship, teamName);
    this.patchState(_draft => ({
      team: {
        championship: parseChampionshipFromName(championship),
        teamName
      }
    }));
  }

  team: Signal<CurrentTeam> = computed(() => requireValue(this.state().team, "Store not initialized!"));
}
