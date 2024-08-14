import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, type Signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { $localize } from '@angular/localize/init';
import { type Icon, IconComponent } from '@einsatzplan/shared-ui/icons';
import { ClubPlayersStore } from '../../club-players.store';
import { MatchID } from '../../model/Match';
import { SetupStatus } from '../../model/MatchSetupConstraint';
import { PlannedMatchSetup, PlayerPlanningStatus, PlayerSetup } from '../../model/PlannedMatchSetup';
import { PlayerID } from '../../model/Player';
import { AggregateConstraint } from '../../model/player-constraints/AggregateConstraint';
import { MinRequiredPlayersConstraint } from '../../model/player-constraints/MinRequiredPlayersConstraint';
import { RequireMatchSetupConstraint } from '../../model/player-constraints/RequireMatchSetupConstraint';
import { isID } from '../../types/ID.type';
import { MatchSetupStore } from '../match-setup.store';
import { MatchSetupInlineForm } from './match-setup-inline.form';
import { PlayerSetupInlineStore } from './player-setup-inline.store';


@Component({
  selector: 'epla-match-setup-inline',
  standalone: true,
  imports: [CommonModule, IconComponent, ReactiveFormsModule],
  templateUrl: './match-setup-inline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './match-setup-inline.component.scss',
  providers: [
    PlayerSetupInlineStore,
  ],
})
export class MatchSetupInlineComponent {
  readonly matchID = input.required<MatchID>();
  readonly playerID = input.required<PlayerID | undefined>();

  readonly #matchSetupStore = inject(MatchSetupStore);
  readonly #playerStore = inject(ClubPlayersStore);
  readonly store = inject(PlayerSetupInlineStore);

  readonly PlayerPlanningStatus = PlayerPlanningStatus;
  readonly form: MatchSetupInlineForm = new MatchSetupInlineForm(inject(NonNullableFormBuilder));

  matchSetup: Signal<PlannedMatchSetup | undefined>;

  constructor() {
    this.matchSetup = this.#matchSetupStore.forMatch(this.matchID);

    this.store.init(this.matchID, this.playerID);

    effect(() => {
      if (this.store.isEditable()) {
        this.form.reset(this.store.playerSetup());
      } else {
        this.form.reset();
      }
    });
  }

  text: Signal<string> = computed<string>(() => {
    const setup = this.matchSetup();
    if (!setup || !setup.players) {
      return $localize`:@@MatchSetupInlineComponent.noSetup:Noch nichts geplant`;
    }

    return Object.keys(setup.players)
      .filter(e => isID('Player', e))
      .map(playerID => this.#playerStore.lookupPlayer(playerID))
      .map((player) => player?.name?.displayedNameShort ?? '???')
      .join(', ');
  });

  setupStatus: Signal<SetupStatus> = computed(() => {
    const setup = this.matchSetup();

    const status = AggregateConstraint.allOf(
        new RequireMatchSetupConstraint(),
        new MinRequiredPlayersConstraint(3),
      )
      .analyze(setup);
    return status;
  });

  icon: Signal<Icon> = computed<Icon>(() => {
    const status = this.setupStatus().status;
    switch (status) {
      case 'ok':
        return 'player-setup-status-ok';
      case 'warning':
        return 'player-setup-status-warning';
      case 'invalid':
        return 'player-setup-status-invalid';
    }
  });


  submit(): void {
    this.form.whenFormValid(value => {
      //alert(`submit: ${JSON.stringify(value)}`);
      this.#matchSetupStore.replacePlayerSetup(this.matchID(), this.playerID()!, value);
    });
  }

  groupName(): string {
    return `match-setup-inline-${this.matchID}-${this.playerID()}`;
  }

  backgroundColor(setup: PlayerSetup | undefined): string {
    if (!setup) {
      return 'inherit';
    }
    switch (setup.status) {
      case 'available':
        return 'var(--color-success)';
      case 'maybe':
        return 'var(--color-warning)';
      case 'unavailable':
        return 'var(--color-danger)';
      default:
        return 'var(--color-light)';
    }
  }
}
