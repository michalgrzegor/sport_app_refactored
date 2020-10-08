import { HttpDataService } from '../services/http-data.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as trainingPlansDataActions from './training-plans-data.actions';

@Injectable()
export class TrainingPlansDataEfects {
  loadTrainingPlansList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingPlansDataActions.LoadTrainingPlansList),
      tap(() => trainingPlansDataActions.LoadingTrainingPlansList()),
      switchMap(() =>
        this.httpDataService.getTrainingPlansList().pipe(
          map((trainingPlansList) => {
            return trainingPlansDataActions.SetTrainingPlansList({
              trainingPlansList,
            });
          })
          // catchError((error) => of(new DeleteItemFailureAction(error)))
        )
      )
    )
  );

  loadTrainingPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingPlansDataActions.LoadTrainingPlan),
      tap(() => {
        trainingPlansDataActions.LoadingTrainingPlan();
      }),
      switchMap((data) =>
        this.httpDataService.getTrainingPlan(`${data.payload}`).pipe(
          map((trainingPlan) => {
            return trainingPlansDataActions.SetTrainingPlan({ trainingPlan });
          })
          // catchError((error) => of(new DeleteItemFailureAction(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpDataService: HttpDataService,
    private store: Store
  ) {}
}
