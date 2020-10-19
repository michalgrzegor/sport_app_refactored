import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectFeature = (state: AppState) => state.menu;

export const isLeftMenuOpen = createSelector(
  selectFeature,
  (menu) => menu.isLeftMenuOpen
);

export const rightMenuComponent = createSelector(
  selectFeature,
  (menu) => menu.rightMenuComponent
);
