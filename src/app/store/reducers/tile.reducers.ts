import { Tile } from './../../shared/models/tile.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as TileActions from '../actions/tile.actions';

export interface TileState {
  isTilesLoading: boolean;
  shouldLoadingTiles: boolean;
  shouldUpdateTrainingPlan: boolean;
  tiles: Tile[];
  tileToEdit: Tile;
}

const InitialState: TileState = {
  isTilesLoading: true,
  shouldLoadingTiles: true,
  shouldUpdateTrainingPlan: false,
  tiles: [],
  tileToEdit: null,
};

const menuReducer = createReducer(
  InitialState,
  on(TileActions.SetTiles, (state, { tiles }) => ({
    ...state,
    tiles: [...tiles],
    isTilesLoading: false,
    shouldLoadingTiles: false,
  })),
  on(TileActions.AddToTilesCollection, (state, { tile }) => {
    const newTiles = [...state.tiles];
    newTiles.push(tile);
    return {
      ...state,
      tiles: newTiles,
    };
  }),
  on(TileActions.SetShouldUpdateTrainingPlan, (state, { setUpdate }) => ({
    ...state,
    shouldUpdateTrainingPlan: setUpdate,
  })),
  on(TileActions.RemoveFromTilesCollection, (state, { tile }) => {
    const newTiles = [...state.tiles.filter((t) => t.id !== tile.id)];
    return {
      ...state,
      shouldUpdateTrainingPlan: true,
      tiles: newTiles,
    };
  }),
  on(TileActions.SetTileToEdit, (state, { tile }) => {
    return {
      ...state,
      tileToEdit: tile,
    };
  }),
  on(TileActions.RemoveTileFromEdit, (state) => {
    return {
      ...state,
      tileToEdit: null,
    };
  }),
  on(TileActions.UpdateTileInCollection, (state, { tile }) => {
    const newTiles = [...state.tiles];
    const index = newTiles.findIndex((t) => t.id === tile.id);
    newTiles[index] = tile;
    return {
      ...state,
      shouldUpdateTrainingPlan: true,
      tiles: newTiles,
    };
  })
);

export function reducer(
  state: TileState | undefined,
  action: Action
): TileState {
  return menuReducer(state, action);
}
