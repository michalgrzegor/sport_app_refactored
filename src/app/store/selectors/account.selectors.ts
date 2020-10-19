import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectFeature = (state: AppState) => state.account;

export const getAccountLevel = createSelector(
  selectFeature,
  (account) => account.accountLevel
);
