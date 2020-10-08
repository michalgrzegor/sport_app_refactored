import { Action, createReducer, on } from '@ngrx/store';
import { CalendarDay } from '../services/calendar-creator.service';
import * as CalendarDataActions from './calendar-data.actions';
import { MenuState } from './menu.reducers';

export interface CalendarState {
  calendarData: CalendarDay[];
  actualPage: number;
}

const InitialState: CalendarState = {
  calendarData: null,
  actualPage: 0,
};

// export function CalendarDataReducer(
//   state = InitialState,
//   action: CalendarDataActions.CalendarDataActions
// ): CalendarState {
//   switch (action.type) {
//     case CalendarDataActions.SET_CALENDAR_DATA:
//       return {
//         ...state,
//         calendarData: [...action.payload],
//       };

//     case CalendarDataActions.SET_NEXT_PAGE:
//       const lastDay = state.calendarData[state.calendarData.length - 1];
//       const lastPage = lastDay.page[lastDay.page.length - 1];
//       return {
//         ...state,
//         actualPage:
//           state.actualPage < lastPage ? state.actualPage + 1 : lastPage,
//       };

//     case CalendarDataActions.SET_PREVIOUS_PAGE:
//       return {
//         ...state,
//         actualPage: state.actualPage === 0 ? 0 : state.actualPage - 1,
//       };

//     default:
//       return state;
//   }
// }

const calendarDataReducer = createReducer(
  InitialState,
  on(CalendarDataActions.SetCalendarData, (state, { calendar }) => {
    console.log(calendar);
    return {
      ...state,
      calendarData: [...calendar],
    };
  }),
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
