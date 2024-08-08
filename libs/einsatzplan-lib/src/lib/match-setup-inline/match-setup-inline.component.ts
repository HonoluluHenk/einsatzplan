import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchSetup} from "@einsatzplan/einsatzplan-lib/model";
import {$localize} from "@angular/localize/init";

@Component({
  selector: 'epla-match-setup-inline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-setup-inline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchSetupInlineComponent {
  setup = input.required<MatchSetup | undefined>();

  text = computed(() => {
    const setup = this.setup();
    if (!setup) {
      return $localize`:@@MatchSetupInlineComponent.noSetup:Nicht geplant`;
    }

    return setup.homePlayers
      .map(p => p.name.displayedNameShort)
      .join(', ')
  })
}
