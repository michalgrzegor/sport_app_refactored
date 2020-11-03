import { Tile } from './../../shared/models/tile.interface';
import { createAction, props } from '@ngrx/store';

export const SetTilesLoading = createAction('[Tile API] SET_TILES_LOADING');

export const GetTiles = createAction('[Tile API] GET_TILES');

export const SetTiles = createAction(
  '[Tile API] SET_TILES',
  props<{ tiles: Tile[] }>()
);

export const SetShouldUpdateTrainingPlan = createAction(
  '[Tile API] SET_SHOULD_UPDATE_TRAINING_PLAN',
  props<{ setUpdate: boolean }>()
);

export const CreateTile = createAction(
  '[Tile API] CREATE_TILE',
  props<{ tile: Tile }>()
);

export const DeleteTile = createAction(
  '[Tile API] DELETE_TILE',
  props<{ tile: Tile }>()
);

export const AddToTilesCollection = createAction(
  '[Tile API] ADD_TO_TILES_COLLECTION',
  props<{ tile: Tile }>()
);

export const RemoveFromTilesCollection = createAction(
  '[Tile API] REMOVE_FROM_TILES_COLLECTION',
  props<{ tile: Tile }>()
);

export const UpdateTileInCollection = createAction(
  '[Tile API] UPDATE_TILE_IN_COLLECTION',
  props<{ tile: Tile }>()
);

export const SetTileToEdit = createAction(
  '[Tile Collection Component] SET_TILE_TO_EDIT',
  props<{ tile: Tile }>()
);

export const RemoveTileFromEdit = createAction(
  '[Tile Collection Component] REMOVE_TILE_FROM_EDIT'
);

export const UpdateTile = createAction(
  '[Tile API] UPDATE_TILE',
  props<{ tile: Tile }>()
);

// export const FinishTileEditing = createAction(
//   '[Tile Collection Component] FINISH_TILE_EDITING',
//   props<{ tile: Tile }>()
// );
