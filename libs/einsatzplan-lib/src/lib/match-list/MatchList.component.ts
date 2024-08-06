import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchListStore} from "./MatchList.store";

@Component({
  selector: 'epla-match-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './MatchList.component.html',
  styleUrl: './MatchList.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MatchListStore
  ]
})
export class MatchListComponent {
  readonly store = inject(MatchListStore)
}
