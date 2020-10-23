import { Tile } from './../../shared/models/tile.interface';
import { createAction, props } from '@ngrx/store';

export const SetTilesLoading = createAction('[Tile API] SET_TILES_LOADING');
export const GetTiles = createAction('[Tile API] GET_TILES');
export const SetTiles = createAction(
  '[Tile API] SET_TILES',
  props<{ tiles: Tile[] }>()
);
export const CreateTile = createAction(
  '[Tile API] CREATE_TILE',
  props<{ data: { tile: Tile; type: 'diet' | 'question' | 'training' } }>()
);
export const DeleteTile = createAction(
  '[Tile API] DELETE_TILE',
  props<{ id: string }>()
);
export const UpdateTiles = createAction(
  '[Tile API] UPDATE_TILES',
  props<{ tile: Tile }>()
);
