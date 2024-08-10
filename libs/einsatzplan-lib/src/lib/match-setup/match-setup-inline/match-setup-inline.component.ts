import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { $localize } from '@angular/localize/init';
import { MatchSetupStore } from '../match-setup.store';
import { PlannedMatchSetup } from '@einsatzplan/einsatzplan-lib/model';

@Component({
  selector: 'epla-match-setup-inline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-setup-inline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchSetupInlineComponent {
  readonly setup = input.required<PlannedMatchSetup | undefined>();

  matchSetupStore = inject(MatchSetupStore);

  text = computed(() => {
    const setup = this.setup();
    if (!setup) {
      return $localize`:@@MatchSetupInlineComponent.noSetup:Nicht geplant`;
    }

    return setup.homePlayers.map((p) => p.name.displayedNameShort).join(', ');
  });

  editable = computed(() => {
    // return hasValue(this.setup());
  });
}
