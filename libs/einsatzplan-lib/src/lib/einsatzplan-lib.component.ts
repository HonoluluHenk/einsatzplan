import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'epla-einsatzplan-lib',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
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
