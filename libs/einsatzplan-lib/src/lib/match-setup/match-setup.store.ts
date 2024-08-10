import { computed, Injectable, Signal } from '@angular/core';
import { ensureProps } from '../util/ensure';
import { BaseStore } from '../store/base.store';
import { MatchID } from '../model/Match';
import { PlannedMatchSetup, PlayerSetup } from '../model/PlannedMatchSetup';
import { PlayerID } from '../model/Player';

interface MatchSetupState {
  matches: Record<MatchID, PlannedMatchSetup>;
}

function createInitialState(): MatchSetupState {
  return ensureProps<MatchSetupState>({
    matches: {},
  });
}

@Injectable()
export class MatchSetupStore extends BaseStore<MatchSetupState> {
  constructor() {
    super(createInitialState());
  }

  forMatch(matchID: MatchID): Signal<PlannedMatchSetup | undefined> {
    return computed(() => this.state().matches[matchID]);
  }

  replacePlayerSetup(
    matchID: MatchID,
    playerID: PlayerID,
    setup: PlayerSetup
  ): void {
    this.patchState((draft) => {
      draft.matches[matchID] = {
        ...(draft.matches[matchID] ?? {}),
        [playerID]: setup,
      };
    });
  }
}
