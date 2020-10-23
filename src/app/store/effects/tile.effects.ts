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
      mergeMap(({ data }) => {
        return this.httpTileDataService.createTile(data.tile, data.type).pipe(
          map((response) => {
            if (response) {
              return tileActions.UpdateTiles({ tile: response });
            }
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private httpTileDataService: HttpTileDataService,
    private redirectAuthService: RedirectAuthService
  ) {}
}
