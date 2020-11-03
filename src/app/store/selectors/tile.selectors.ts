import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectFeature = (state: AppState) => state.tile;
export const calendarState = (state: AppState) =>
  state.calendarData.calendarData;

export const shouldLoadingTiles = createSelector(
  selectFeature,
  (tile) => tile.shouldLoadingTiles
);

export const GetTiles = createSelector(selectFeature, (tile) => tile.tiles);

export const GetTileToEdit = createSelector(
  selectFeature,
  (tile) => tile.tileToEdit
);

export const GetShouldUpdateTrainingPlan = createSelector(
  selectFeature,
  (tile) => tile.shouldUpdateTrainingPlan
);
