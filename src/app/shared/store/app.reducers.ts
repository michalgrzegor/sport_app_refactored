import { ActionReducerMap } from '@ngrx/store';

import * as fromMenu from './menu.reducers';
import * as fromAccount from './account.reducers';
import * as fromTrainingPlansData from './training-plans-data.reducers';
import * as fromCalendarData from './calendar-data.reducers';
import * as fromAuth from './auth.reducers';

export interface AppState {
  menu: fromMenu.MenuState;
  account: fromAccount.AccountState;
  trainingPlansData: fromTrainingPlansData.TrainingPlansDataState;
  calendarData: fromCalendarData.CalendarState;
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  menu: fromMenu.reducer,
  account: fromAccount.reducer,
  trainingPlansData: fromTrainingPlansData.reducer,
  calendarData: fromCalendarData.reducer,
  auth: fromAuth.reducer,
};
