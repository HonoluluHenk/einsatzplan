import {FallbackDirective} from './fallback.directive';
import {ElementRef} from "@angular/core";

describe('FallbackDirective', () => {
  let elementRef: ElementRef<HTMLElement>;
  let directive: FallbackDirective;

  beforeEach(() => {
    elementRef = new ElementRef<HTMLElement>(document.createElement('div'));
    directive = new FallbackDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
