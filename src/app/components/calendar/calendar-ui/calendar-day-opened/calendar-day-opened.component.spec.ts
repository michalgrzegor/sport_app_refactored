import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayOpenedComponent } from './calendar-day-opened.component';

describe('CalendarDayOpenedComponent', () => {
  let component: CalendarDayOpenedComponent;
  let fixture: ComponentFixture<CalendarDayOpenedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDayOpenedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayOpenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
