import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { isEqual } from 'date-fns';

export const selectFeature = (state: AppState) => state.calendarData;
export const selectFeaturePage = (state: AppState) =>
  state.calendarData.actualPage;

export const getCalendarData = createSelector(
  selectFeature,
  selectFeaturePage,
  (calendarData, page) =>
    calendarData.calendarData?.filter((day) => day.page.includes(page))
);

export const getActualPage = createSelector(
  selectFeature,
  (calendarData) => calendarData.actualPage
);

export const getOpenedDay = createSelector(selectFeature, (calendarData) =>
  calendarData.calendarData.find((day) =>
    isEqual(day.date, calendarData.openedDay)
  )
);

export const getIsCalendarDataLoading = createSelector(
  selectFeature,
  (calendarData) => calendarData.isCalendarDataLoading
);
