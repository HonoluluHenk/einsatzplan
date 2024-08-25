import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatchID } from '@einsatzplan/model/Match';
import { PlayerSetup } from '@einsatzplan/model/PlannedMatchSetup';
import { FallbackDirective } from '@einsatzplan/shared-ui/fallback/fallback.directive';
import { SectionDirective } from '@einsatzplan/shared-ui/section';
import { TableDirective } from '@einsatzplan/shared-ui/table/table.directive';
import { CurrentPlayerStore } from '../current-player.store';
import { CurrentPlayerComponent } from '../current-player/current-player.component';
import { MatchSetupInlineComponent } from '../match-setup/match-setup-inline/match-setup-inline.component';
import { MatchSetupStore } from '../match-setup/match-setup.store';
import { TimePipe } from '../util-angular/time.pipe';
import { MatchListStore } from './MatchList.store';

@Component({
  selector: 'epla-match-list',
  standalone: true,
  imports: [
    CommonModule,
    TimePipe,
    MatchSetupInlineComponent,
    SectionDirective,
    TableDirective,
    FallbackDirective,
    FormsModule,
    CurrentPlayerComponent,
  ],
  templateUrl: './MatchList.component.html',
  styleUrl: './MatchList.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MatchListStore,
  ],
})
export class MatchListComponent {
  readonly store = inject(MatchListStore);
  readonly currentPlayerStore = inject(CurrentPlayerStore);
  readonly matchSetupStore = inject(MatchSetupStore);

  updatePlayerSetup(
    matchID: MatchID,
    playerSetup: PlayerSetup,
  ): void {
    const playerID = this.currentPlayerStore.currentPlayerID();
    if (!playerID) {
      throw Error('Unexpected: No player selected but player setup updated');
    }
    this.matchSetupStore.replacePlayerSetup(matchID, playerID, playerSetup);
  }
}
