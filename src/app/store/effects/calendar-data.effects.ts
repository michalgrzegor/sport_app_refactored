import { HttpAssociationService } from './../../shared/services/http-association.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as calendarDataActions from '../actions/calendar-data.actions';

@Injectable()
export class CalendarDataEfects {
  addTileToDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarDataActions.AddTileToDay),
      mergeMap(({ association }) =>
        this.httpAssociationService.addTileToDay(association).pipe(
          map((response) =>
            calendarDataActions.UpdateCalendarAssociations({
              association: response,
            })
          )
        )
      )
    )
  );

  removeTileFromDay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarDataActions.RemoveTileFromDay),
      mergeMap(({ association }) =>
        this.httpAssociationService.removeTileFromDay(association).pipe(
          map(() =>
            calendarDataActions.RemoveCalendarAssociations({
              association,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpAssociationService: HttpAssociationService,
    private store: Store
  ) {}
}
