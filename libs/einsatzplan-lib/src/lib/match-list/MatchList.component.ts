import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchListStore } from './MatchList.store';
import { TimePipe } from '../util-angular/time.pipe';
import { MatchSetupInlineComponent } from '../match-setup/match-setup-inline/match-setup-inline.component';
import { SectionDirective } from '@einsatzplan/shared-ui/section';
import { TableDirective } from '@einsatzplan/shared-ui/table/table.directive';
import { FallbackDirective } from '@einsatzplan/shared-ui/fallback/fallback.directive';
import { FormsModule } from '@angular/forms';
import { CurrentPlayerComponent } from '../current-player/current-player.component';
import { CurrentPlayerStore } from '../current-player.store';

@Component({
  selector: 'epla-match-list',
  standalone: true,
  imports: [CommonModule, TimePipe, MatchSetupInlineComponent, SectionDirective, TableDirective, FallbackDirective, FormsModule, CurrentPlayerComponent],
  templateUrl: './MatchList.component.html',
  styleUrl: './MatchList.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MatchListStore
  ]
})
export class MatchListComponent {
  readonly store = inject(MatchListStore);
  readonly currentPlayerStore = inject(CurrentPlayerStore);

}
