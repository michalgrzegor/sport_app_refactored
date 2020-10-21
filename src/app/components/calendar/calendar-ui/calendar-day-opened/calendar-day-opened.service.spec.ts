import { TestBed } from '@angular/core/testing';

import { CalendarDayOpenedService } from './calendar-day-opened.service';

describe('CalendarDayOpenedService', () => {
  let service: CalendarDayOpenedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDayOpenedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
