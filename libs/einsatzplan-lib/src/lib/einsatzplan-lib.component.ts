import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchListComponent} from "./match-list/MatchList.component";

@Component({
  selector: 'epla-einsatzplan-lib',
  standalone: true,
  imports: [CommonModule, MatchListComponent],
  templateUrl: './einsatzplan-lib.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EinsatzplanLibComponent {
}
