import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EinsatzplanLibComponent } from './einsatzplan-lib.component';

describe('EinsatzplanLibComponent', () => {
  let component: EinsatzplanLibComponent;
  let fixture: ComponentFixture<EinsatzplanLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EinsatzplanLibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EinsatzplanLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
