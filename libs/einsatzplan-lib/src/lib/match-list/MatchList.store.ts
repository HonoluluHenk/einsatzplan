import {BaseStore} from "../store/base.store";
import {Match} from "../model/match";
import {computed, Injectable} from "@angular/core";
import {ensureProps} from "../util/ensure";
import {randomID} from "../types/ID.type";

export class Loader {

}

interface MatchListState {
  matches: Match[];
}

@Injectable()
export class MatchListStore extends BaseStore<MatchListState> {
  constructor() {
    super({
      matches: [
        ensureProps<Match>({
          id: randomID('Match'),
          homeTeamId: randomID('Team'),
          opponentTeamId: randomID('Team'),
          venueId: randomID('Venue'),
          date: "2024-08-01",
          startTime: "19:45:00",
          flags: undefined,
          plannedSetup: undefined
        })
      ]
    });
  }

  matches = computed(() => this.state().matches);
}
