import { Action, createAction, props } from '@ngrx/store';
import { CalendarDay } from '../services/calendar-creator.service';

// export const SET_CALENDAR_DATA = 'SET_CALENDAR_DATA';
// export const SET_NEXT_PAGE = 'SET_NEXT_PAGE';
// export const SET_PREVIOUS_PAGE = 'SET_PREVIOUS_PAGE';

// export class SetCalendarData implements Action {
//   readonly type = SET_CALENDAR_DATA;
//   constructor(public payload: CalendarDay[]) {}
// }

// export class SetNextPage implements Action {
//   readonly type = SET_NEXT_PAGE;
// }

// export class SetPreviousPage implements Action {
//   readonly type = SET_PREVIOUS_PAGE;
// }

// export type CalendarDataActions =
// | SetCalendarData
// | SetNextPage
// | SetPreviousPage;

export const SetCalendarData = createAction(
  '[Create Calendar Service] SET_CALENDAR_DATA',
  props<{ calendar: CalendarDay[] }>()
);
export const SetNextPage = createAction('[Calendar module] SET_NEXT_PAGE');
export const SetPreviousPage = createAction(
  '[Calendar module] SET_PREVIOUS_PAGE'
);
