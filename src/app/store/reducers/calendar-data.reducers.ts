import { Action, createReducer, on } from '@ngrx/store';
import { CalendarDay } from 'src/app/shared/models/calendar.interface';
import { isEqual } from 'date-fns';
import * as CalendarDataActions from '../actions/calendar-data.actions';

export interface CalendarState {
  isCalendarDataLoading: boolean;
  calendarData: CalendarDay[];
  actualPage: number;
  openedDay: Date;
}

const InitialState: CalendarState = {
  isCalendarDataLoading: true,
  calendarData: null,
  actualPage: 0,
  openedDay: null,
};

const calendarDataReducer = createReducer(
  InitialState,
  on(CalendarDataActions.SetCalendarData, (state, { calendar }) => ({
    ...state,
    isCalendarDataLoading: false,
    calendarData: [...calendar],
  })),
  on(
    CalendarDataActions.SetIsCalendarDataLoading,
    (state, { isCalendarDataLoading }) => ({
      ...state,
      isCalendarDataLoading,
    })
  ),
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
  })),
  on(CalendarDataActions.SetOpenedDay, (state, { calendarDay }) => {
    return {
      ...state,
      openedDay: calendarDay ? calendarDay.date : null,
    };
  }),
  on(
    CalendarDataActions.UpdateCalendarAssociations,
    (state, { association }) => {
      const index = state.calendarData.findIndex((c) =>
        isEqual(c.date, new Date(association.calendar_date))
      );
      const copiedCalendar = [...state.calendarData];
      const copiedDay = { ...copiedCalendar[index] };
      const copiedAssociations = [...copiedDay.associations];
      copiedAssociations.push(association);
      copiedDay.associations = copiedAssociations;
      copiedCalendar[index] = copiedDay;
      return {
        ...state,
        isCalendarDataLoading: false,
        calendarData: copiedCalendar,
      };
    }
  ),
  on(
    CalendarDataActions.RemoveCalendarAssociations,
    (state, { association }) => {
      const index = state.calendarData.findIndex((c) =>
        isEqual(c.date, new Date(association.calendar_date))
      );
      const copiedCalendar = [...state.calendarData];
      const copiedDay = { ...copiedCalendar[index] };
      const copiedAssociations = [
        ...copiedDay.associations.filter((a) => a.id !== association.id),
      ];
      copiedDay.associations = copiedAssociations;
      copiedCalendar[index] = copiedDay;
      return {
        ...state,
        isCalendarDataLoading: false,
        calendarData: copiedCalendar,
      };
    }
  )
);

export function reducer(
  state: CalendarState | undefined,
  action: Action
): CalendarState {
  return calendarDataReducer(state, action);
}
