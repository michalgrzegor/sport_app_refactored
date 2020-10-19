import { createAction, props } from '@ngrx/store';
import { CalendarDay } from 'src/app/shared/services/calendar-creator.service';

export const SetCalendarData = createAction(
  '[Create Calendar Service] SET_CALENDAR_DATA',
  props<{ calendar: CalendarDay[] }>()
);
export const SetNextPage = createAction('[Calendar module] SET_NEXT_PAGE');
export const SetPreviousPage = createAction(
  '[Calendar module] SET_PREVIOUS_PAGE'
);
