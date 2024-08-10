import { BaseStore } from './store/base.store';
import { computed, Injectable } from '@angular/core';
import { Player, PlayerID } from './model/Player';
import { isID } from './types/ID.type';

interface CurrentPlayerState {
  playerID: PlayerID | undefined;
}

@Injectable()
export class CurrentPlayerStore extends BaseStore<CurrentPlayerState> {
  constructor() {
    super({
      playerID: CurrentPlayerStore.restoreFromLocalStorage(),
    });
  }

  private static restoreFromLocalStorage(): PlayerID | undefined {
    const currentPlayerID = localStorage.getItem('currentPlayerID');
    if (!isID('Player', currentPlayerID)) {
      return undefined;
    }

    return currentPlayerID;
  }

  playerChanged(player: Player | undefined): void;
  playerChanged(playerID: PlayerID | undefined): void;
  playerChanged(playerOrID: PlayerID | Player | undefined): void {
    let id: PlayerID | undefined;
    if (playerOrID === undefined) {
      id = undefined;
      localStorage.removeItem('currentPlayerID');
    } else {
      id = isID('Player', playerOrID) ? playerOrID : playerOrID.id;
      localStorage.setItem('currentPlayerID', id);
    }
    this.patchState((draft) => {
      draft.playerID = id;
    });
  }

  currentPlayerID = computed(() => this.state().playerID);
}
