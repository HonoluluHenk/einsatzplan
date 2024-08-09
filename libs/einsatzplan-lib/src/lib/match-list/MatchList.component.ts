import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchListStore} from "./MatchList.store";
import {TimePipe} from "@einsatzplan/einsatzplan-lib/util-angular/time.pipe";
import {MatchSetupInlineComponent} from "@einsatzplan/einsatzplan-lib/match-setup-inline/match-setup-inline.component";
import {SectionDirective} from "@einsatzplan/shared-ui/section";
import {TableDirective} from "@einsatzplan/shared-ui/table/table.directive";
import {FallbackDirective} from "@einsatzplan/shared-ui/fallback/fallback.directive";
import {FormsModule} from "@angular/forms";
import {CurrentPlayerComponent} from "@einsatzplan/einsatzplan-lib/current-player/current-player.component";
import {CurrentPlayerStore} from "@einsatzplan/einsatzplan-lib/current-player.store";

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
  readonly store = inject(MatchListStore)
  readonly currentPlayerStore = inject(CurrentPlayerStore);

}
