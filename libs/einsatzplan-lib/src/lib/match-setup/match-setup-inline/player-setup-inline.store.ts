import {computed, effect, inject, Injectable, type Signal} from '@angular/core';
import { ClubPlayersStore } from '../../club-players.store';
import { MatchSetupStore } from '../match-setup.store';
import { initialPlayerSetup, PlayerSetup } from '../../model/PlannedMatchSetup';
import { MatchID } from '../../model/Match';
import { Player, PlayerID } from '../../model/Player';
import { hasValue } from '../../util/nullish';
import {BaseStore} from '../../store/base.store';
import {ensureProps} from '../../util/ensure';

interface PlayerSetupInlineState {
  player: Player | undefined;
  playerSetup: PlayerSetup | undefined;
}

function createInitialState(): PlayerSetupInlineState {
  return ensureProps<PlayerSetupInlineState>({
    player: undefined,
    playerSetup: undefined,
  });
}

@Injectable()
export class PlayerSetupInlineStore extends BaseStore<PlayerSetupInlineState> {
  readonly #matchSetupStore = inject(MatchSetupStore);
  readonly #playersStore = inject(ClubPlayersStore);

  constructor() {
    super(createInitialState());
  }

  init(
    matchID: Signal<MatchID>,
    playerID: Signal<PlayerID | undefined>,
  ): void {
    effect(
      () => {
        const pid = playerID();
        const matchSetup = this.#matchSetupStore.forMatch(matchID)();
        const playerSetup = (pid && matchSetup?.players?.[pid])
          ?? initialPlayerSetup();

        const player = pid && this.#playersStore.players()[pid];

        this.patchState((_draft) => ({
          player,
          playerSetup,
        }));
      },
      {allowSignalWrites: true},
    );
  }

  isEditable = computed<boolean>(() => hasValue(this.state().player));
  playerSetup = computed<PlayerSetup | undefined>(() => this.state().playerSetup);
}
