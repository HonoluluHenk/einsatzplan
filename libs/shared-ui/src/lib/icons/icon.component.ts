import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, type Signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import type { IconProp } from '@fortawesome/angular-fontawesome/types';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';

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

  fontAwesomeIcon: Signal<IconProp> = computed(() => mapToFontAwesome(this.icon()));
}


function mapToFontAwesome(icon: Icon): IconProp {
  switch (icon) {
    case 'player-setup-status-ok':
      return faCheckCircle;
    case 'player-setup-status-warning':
      return faQuestionCircle;
    case 'player-setup-status-invalid':
      return faExclamationCircle;
  }
}
