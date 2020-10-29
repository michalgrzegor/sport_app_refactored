import { HttpAssociationService } from './../../shared/services/http-association.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as calendarDataActions from '../actions/calendar-data.actions';

@Injectable()
export class CalendarDataEfects {
  loadTrainingPlansList$ = createEffect(() =>
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

  constructor(
    private actions$: Actions,
    private httpAssociationService: HttpAssociationService,
    private store: Store
  ) {}
}
