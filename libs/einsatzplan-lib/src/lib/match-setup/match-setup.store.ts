import {computed, Injectable, type Signal} from '@angular/core';
import {MatchID} from '../model/Match';
import {PlannedMatchSetup, PlayerSetup} from '../model/PlannedMatchSetup';
import {PlayerID} from '../model/Player';
import {BaseStore} from '../store/base.store';
import {ensureProps} from '../util/ensure';

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

  forMatch = (matchID: Signal<MatchID>): Signal<PlannedMatchSetup | undefined> => computed<PlannedMatchSetup | undefined>(() => {
    return this.state().matches[matchID()];
  });

  replacePlayerSetup(
    matchID: MatchID,
    playerID: PlayerID,
    setup: PlayerSetup,
  ): void {
    this.patchState((draft) => {
      if (!draft.matches[matchID]) {
        draft.matches[matchID] = {players: {}};
      }

      draft.matches[matchID].players[playerID] = setup;
    });
  }
}
