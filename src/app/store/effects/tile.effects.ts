import { HttpTileDataService } from './../../shared/services/http-tile-data.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, mergeMap } from 'rxjs/operators';
import * as tileActions from '../actions/tile.actions';
import { RedirectAuthService } from 'src/app/shared/auth/redirect-auth.service';

@Injectable()
export class TileEfects {
  CreateTile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tileActions.CreateTile),
      mergeMap(({ tile }) => {
        return this.httpTileDataService.createTile(tile).pipe(
          map((response) => {
            if (response) {
              return tileActions.AddToTilesCollection({ tile: response });
            }
          })
        );
      })
    )
  );

  GetTiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tileActions.GetTiles),
      mergeMap(() =>
        this.httpTileDataService.getTiles().pipe(
          map((response) => {
            if (response) {
              return tileActions.SetTiles({ tiles: response });
            }
          })
        )
      )
    )
  );

  DeleteTile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tileActions.DeleteTile),
      mergeMap(({ tile }) =>
        this.httpTileDataService.deleteTile(tile).pipe(
          map((response) => {
            if (response) {
              return tileActions.RemoveFromTilesCollection({ tile });
            }
          })
        )
      )
    )
  );

  UpdateTile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tileActions.UpdateTile),
      mergeMap(({ tile }) =>
        this.httpTileDataService.updateTile(tile).pipe(
          map((response) => {
            if (response) {
              return tileActions.UpdateTileInCollection({ tile });
            }
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpTileDataService: HttpTileDataService,
    private redirectAuthService: RedirectAuthService
  ) {}
}
