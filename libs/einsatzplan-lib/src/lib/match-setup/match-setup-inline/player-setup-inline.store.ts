import { computed, inject, Injectable, type Signal } from '@angular/core';
import { $localize } from '@angular/localize/init';
import { SetupStatus } from '@einsatzplan/model/MatchSetupConstraint';
import { PlannedMatchSetup, PlayerPlanningStatus, PlayerSetup } from '@einsatzplan/model/PlannedMatchSetup';
import { Player, PlayerID } from '@einsatzplan/model/Player';
import { ensureProps } from '@einsatzplan/shared-util/ensure';
import { hasValue } from '@einsatzplan/shared-util/nullish';
import { isID } from '@einsatzplan/shared-util/types/ID.type';
import { ClubPlayersStore } from '../../club-players.store';
import { AggregateConstraint } from '../../player-constraints/AggregateConstraint';
import { MinRequiredPlayersConstraint } from '../../player-constraints/MinRequiredPlayersConstraint';
import { RequireMatchSetupConstraint } from '../../player-constraints/RequireMatchSetupConstraint';
import { BaseStore } from '../../store/base.store';

interface PlayerSetupInlineState {
  currentPlayerID: PlayerID | undefined;
  matchSetup: PlannedMatchSetup | undefined;
}

function createInitialState(): PlayerSetupInlineState {
  return ensureProps<PlayerSetupInlineState>({
    currentPlayerID: undefined,
    matchSetup: undefined,
  });
}

@Injectable()
export class PlayerSetupInlineStore extends BaseStore<PlayerSetupInlineState> {
  readonly #playersStore = inject(ClubPlayersStore);

  constructor() {
    super(createInitialState());
  }

  init(
    matchSetup: PlannedMatchSetup | undefined,
    currentPlayerID: PlayerID | undefined,
  ): void {
    this.patchState(_draft => ({
      matchSetup,
      currentPlayerID,
    }));
  }

  currentPlayer = computed<Player | undefined>(() => {
    const playerID = this.state().currentPlayerID;
    if (!playerID) {
      return undefined;
    }
    return this.#playersStore.players()[playerID];
  });

  isEditable = computed<boolean>(() => hasValue(this.currentPlayer()));

  playerSetup = computed<PlayerSetup | undefined>(() => {
    const playerID = this.state().currentPlayerID;
    if (!playerID) {
      return undefined;
    }
    return this.state()?.matchSetup?.players[playerID];
  });


  setupStatus: Signal<SetupStatus> = computed(() => {
    const setup = this.state().matchSetup;

    const status = AggregateConstraint.allOf(
        new RequireMatchSetupConstraint(),
        new MinRequiredPlayersConstraint(3),
      )
      .analyze(setup);
    return status;
  });

  setupText = computed<string>(() => {
    const unplannedMessage: string = $localize`:@@MatchSetupInlineComponent.noSetup:Noch nichts geplant`;

    const setup = this.state().matchSetup;
    if (!setup || !setup?.players) {
      return unplannedMessage;
    }

    const entries: `Player:${string}`[] = Object.keys(setup.players)
      .filter(e => isID('Player', e))
      .filter(p => setup.players[p].status !== PlayerPlanningStatus.unknown);
    if (entries.length === 0) {
      return unplannedMessage;
    }

    return entries
      .map(playerID => ({playerID, player: this.#playersStore.lookupPlayer(playerID)}))
      .map(({playerID, player}) => player?.name?.displayedNameShort ?? 'Unknown Player: ' + playerID)
      .join(', ');
  });
}
