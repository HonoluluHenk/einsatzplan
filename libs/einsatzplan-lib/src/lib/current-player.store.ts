import {BaseStore} from "@einsatzplan/einsatzplan-lib/store/base.store";
import {computed, Injectable} from "@angular/core";
import {Player} from "@einsatzplan/einsatzplan-lib/model";
import {ID, isID} from "@einsatzplan/einsatzplan-lib/types/ID.type";

interface CurrentPlayerState {
  playerID: ID<'Player'> | undefined
}

@Injectable()
export class CurrentPlayerStore extends BaseStore<CurrentPlayerState> {

  constructor() {
    super({
      playerID: CurrentPlayerStore.restoreFromLocalStorage()
    });
  }

  private static restoreFromLocalStorage(): ID<'Player'> | undefined {
    const currentPlayerID = localStorage.getItem('currentPlayerID');
    if (!isID('Player', currentPlayerID)) {
      return undefined;
    }

    return currentPlayerID;
  }

  playerChanged(player: Player | undefined): void
  playerChanged(playerID: ID<'Player'> | undefined): void
  playerChanged(playerOrID: ID<'Player'> | Player | undefined): void {
    let id: ID<'Player'> | undefined;
    if (playerOrID === undefined) {
      id = undefined;
      localStorage.removeItem('currentPlayerID');
    } else {
      id = isID('Player', playerOrID) ? playerOrID : playerOrID.id;
      localStorage.setItem('currentPlayerID', id);
    }
    this.patchState(draft => {
      draft.playerID = id;
    });

  }

  currentPlayerID = computed(() => this.state().playerID);
}
