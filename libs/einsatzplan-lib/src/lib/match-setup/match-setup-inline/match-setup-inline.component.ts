import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  type Signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PlannedMatchSetup, PlayerPlanningStatus, PlayerSetup } from '@einsatzplan/model/PlannedMatchSetup';
import { PlayerID } from '@einsatzplan/model/Player';
import { type Icon, IconComponent } from '@einsatzplan/shared-ui/icons';
import { MatchSetupInlineForm } from './match-setup-inline.form';
import { PlayerSetupInlineStore } from './player-setup-inline.store';

let groupCounter = 0;

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

  readonly matchSetup = input.required<PlannedMatchSetup | undefined>();
  readonly playerID = input.required<PlayerID | undefined>();
  readonly playerSetup = output<PlayerSetup>();

  readonly store = inject(PlayerSetupInlineStore);

  readonly PlayerPlanningStatus = PlayerPlanningStatus;
  readonly form: MatchSetupInlineForm = new MatchSetupInlineForm(inject(NonNullableFormBuilder));

  constructor() {
    effect(() => {
      this.store.init(this.matchSetup(), this.playerID());
    }, {allowSignalWrites: true});

    effect(() => {
      if (this.store.isEditable()) {
        this.form.reset(this.store.playerSetup());
      } else {
        this.form.reset();
      }
    });
  }

  icon: Signal<Icon> = computed<Icon>(() => {
    const status = this.store.setupStatus().status;
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
      this.playerSetup.emit(value);
    });
  }

  groupName(): string {
    return `match-setup-inline-${++groupCounter}-${this.playerID()}`;
  }

}
