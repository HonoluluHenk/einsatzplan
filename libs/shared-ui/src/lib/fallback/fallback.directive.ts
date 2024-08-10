import { Directive } from '@angular/core';

@Directive({
  selector: '[libSharedUi]',
  standalone: true,
})
export class FallbackDirective {
  // ref = inject(ElementRef<HTMLElement>);
  // constructor() {
  //   console.debug('FallbackDirective used on:', this.ref.nativeElement);
  // }
}
