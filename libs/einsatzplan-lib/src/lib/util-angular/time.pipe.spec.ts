import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ISOLocalTimeString } from '@einsatzplan/shared-util/types/ISOLocalTimeString';
import { TimePipe } from './time.pipe';

describe('TimePipe', () => {

  @Component({
    template: '{{ key | time }}',
    standalone: true,
    imports: [
      TimePipe,
    ],
  })
  class HostComponent {
    public key: ISOLocalTimeString = '12:34:56';
  }

  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        {provide: Location, useValue: 'en-US'},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('prints the time in our format', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toEqual('12:34 PM');
  });
});
