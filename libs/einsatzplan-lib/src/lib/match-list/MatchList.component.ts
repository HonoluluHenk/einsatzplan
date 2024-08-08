import {ChangeDetectionStrategy, Component, inject, LOCALE_ID} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchListStore} from "./MatchList.store";
import {TimePipe} from "@einsatzplan/einsatzplan-lib/util-angular/time.pipe";
import {MatchSetupInlineComponent} from "@einsatzplan/einsatzplan-lib/match-setup-inline/match-setup-inline.component";

@Component({
  selector: 'epla-match-list',
  standalone: true,
  imports: [CommonModule, TimePipe, MatchSetupInlineComponent],
  templateUrl: './MatchList.component.html',
  styleUrl: './MatchList.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MatchListStore
  ]
})
export class MatchListComponent {
  readonly store = inject(MatchListStore)

  lang = inject(LOCALE_ID);
}
