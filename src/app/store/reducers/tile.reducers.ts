import { Tile } from './../../shared/models/tile.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as TileActions from '../actions/tile.actions';

export interface TileState {
  isTilesLoading: boolean;
  tiles: Tile[];
}

const InitialState: TileState = {
  isTilesLoading: true,
  tiles: [],
};

const menuReducer = createReducer(
  InitialState,
  on(TileActions.SetTiles, (state, { tiles }) => ({
    ...state,
    tiles: [...tiles],
  })),
  on(TileActions.UpdateTiles, (state, { tile }) => {
    const newTiles = [...state.tiles];
    newTiles.push(tile);
    return {
      ...state,
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
