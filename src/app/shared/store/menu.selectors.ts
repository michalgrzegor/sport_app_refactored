import { createSelector } from '@ngrx/store';
import { MenuState } from './menu.reducers';

export const selectFeature = (state: MenuState) => state;

export const isLeftMenuOpen = createSelector(
  selectFeature,
  (menu) => menu.isLeftMenuOpen
);

export const rightMenuComponent = createSelector(
  selectFeature,
  (menu) => menu.rightMenuComponent
);
