import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FallbackDirective} from "@einsatzplan/shared-ui/fallback";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SectionDirective} from "@einsatzplan/shared-ui/section";
import { CurrentPlayerStore } from '../current-player.store';
import { isID } from '../types/ID.type';
import { ClubPlayersStore } from '../club-players.store';

@Component({
  selector: 'epla-current-player',
  standalone: true,
  imports: [CommonModule, FallbackDirective, ReactiveFormsModule, SectionDirective, FormsModule],
  templateUrl: './current-player.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentPlayerComponent {
  readonly clubPlayersStore = inject(ClubPlayersStore);
  readonly currentPlayerStore = inject(CurrentPlayerStore);

  playerChanged(value: unknown) {
    console.debug(value);
    const id = isID('Player', value) ? value : undefined;
    this.currentPlayerStore.playerChanged(id);
  }

}
