import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarUiComponent } from './calendar-ui.component';

describe('CalendarUiComponent', () => {
  let component: CalendarUiComponent;
  let fixture: ComponentFixture<CalendarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
