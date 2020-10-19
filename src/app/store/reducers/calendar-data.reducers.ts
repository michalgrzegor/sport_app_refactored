import { Action, createReducer, on } from '@ngrx/store';
import { CalendarDay } from 'src/app/shared/services/calendar-creator.service';
import * as CalendarDataActions from '../actions/calendar-data.actions';

export interface CalendarState {
  calendarData: CalendarDay[];
  actualPage: number;
}

const InitialState: CalendarState = {
  calendarData: null,
  actualPage: 0,
};

const calendarDataReducer = createReducer(
  InitialState,
  on(CalendarDataActions.SetCalendarData, (state, { calendar }) => ({
    ...state,
    calendarData: [...calendar],
  })),
  on(CalendarDataActions.SetNextPage, (state) => {
    const lastDay = state.calendarData[state.calendarData.length - 1];
    const lastPage = lastDay.page[lastDay.page.length - 1];
    return {
      ...state,
      actualPage: state.actualPage < lastPage ? state.actualPage + 1 : lastPage,
    };
  }),
  on(CalendarDataActions.SetPreviousPage, (state) => ({
    ...state,
    actualPage: state.actualPage === 0 ? 0 : state.actualPage - 1,
  }))
);

export function reducer(
  state: CalendarState | undefined,
  action: Action
): CalendarState {
  return calendarDataReducer(state, action);
}
