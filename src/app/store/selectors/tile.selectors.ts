import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectFeature = (state: AppState) => state.tile;

export const shouldLoadingTiles = createSelector(
  selectFeature,
  (tile) => tile.shouldLoadingTiles
);

export const GetTiles = createSelector(selectFeature, (tile) => tile.tiles);

export const GetTileToEdit = createSelector(
  selectFeature,
  (tile) => tile.tileToEdit
);
