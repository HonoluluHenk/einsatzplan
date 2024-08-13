import {FallbackDirective} from './fallback.directive';

describe('FallbackDirective', () => {
  //let elementRef: ElementRef<HTMLElement>;
  let directive: FallbackDirective;

  beforeEach(() => {
    //elementRef = new ElementRef<HTMLElement>(document.createElement('div'));
    //directive = new FallbackDirective(elementRef);
    directive = new FallbackDirective();
  });

  it('should create an instance', () => {
    expect(directive)
      .toBeTruthy();
  });
});
