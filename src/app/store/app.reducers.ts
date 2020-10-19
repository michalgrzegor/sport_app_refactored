import { ActionReducerMap } from '@ngrx/store';

import * as fromMenu from './reducers/menu.reducers';
import * as fromAccount from './reducers/account.reducers';
import * as fromTrainingPlansData from './reducers/training-plans-data.reducers';
import * as fromCalendarData from './reducers/calendar-data.reducers';
import * as fromAuth from './reducers/auth.reducers';

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
