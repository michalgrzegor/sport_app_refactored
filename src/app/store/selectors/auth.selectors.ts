import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectFeature = (state: AppState) => state.auth;

export const getIsInAuthProcess = createSelector(
  selectFeature,
  (auth) => auth.isInAuthProcess
);

export const getIsAuthenticated = createSelector(
  selectFeature,
  (auth) => auth.isAuthenticated
);

export const getAccessToken = createSelector(
  selectFeature,
  (auth) => auth.accessToken
);
