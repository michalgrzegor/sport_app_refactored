import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as trainingPlansDataActions from '../actions/training-plans-data.actions';
import { HttpDataService } from 'src/app/shared/services/http-data.service';

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

  createNewTrainingPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingPlansDataActions.CreateNewTrainingPlan),
      mergeMap(({ newTrainingPlan }) =>
        this.httpDataService.createTrainingPlan(newTrainingPlan).pipe(
          switchMap((trainingPlan) =>
            this.httpDataService.getTrainingPlansList().pipe(
              map((trainingPlansList) => {
                return trainingPlansDataActions.SetTrainingPlanAndPlansList({
                  trainingPlansList,
                  trainingPlan,
                });
              })
              // catchError((error) => of(new DeleteItemFailureAction(error)))
            )
          )
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
