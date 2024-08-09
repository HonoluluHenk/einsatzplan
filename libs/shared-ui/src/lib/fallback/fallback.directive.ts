import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[sharedUi]',
  standalone: true,
})
export class FallbackDirective {
  constructor(
    _ref: ElementRef<HTMLElement>
  ) {
    // console.debug('FallbackDirective used on:', ref.nativeElement);
  }
}
