import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectFeature = (state: AppState) => state.calendarData;
export const selectFeaturePage = (state: AppState) =>
  state.calendarData.actualPage;

export const getCalendarData = createSelector(
  selectFeature,
  selectFeaturePage,
  (calendarData, page) =>
    calendarData.calendarData?.filter((day) => day.page.includes(page))
);
