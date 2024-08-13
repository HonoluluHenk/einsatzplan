import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import type { IconName, IconPrefix } from '@fortawesome/angular-fontawesome/types';
import type { Icon } from './icon';

@Component({
  selector: 'lib-shared-ui-icon',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './icon.component.html',
  styles: `
    :host {
      display: inline;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly icon = input.required<Icon>();

  fontAwesomeIcon = computed(() => mapToFontAwesome(this.icon()));
}


function mapToFontAwesome(icon: Icon): [IconPrefix, IconName] {
  switch (icon) {
    case 'player-setup-status-ok':
      return ['fas', 'check-circle'];
    case 'player-setup-status-warning':
      return ['fas', 'question-circle'];
    case 'player-setup-status-invalid':
      return ['fas', 'exclamation-circle'];
  }
}
