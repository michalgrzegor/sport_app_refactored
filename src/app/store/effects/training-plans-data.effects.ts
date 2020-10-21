import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as trainingPlansDataActions from '../actions/training-plans-data.actions';
import { HttpDataService } from 'src/app/shared/services/http-data.service';
import { of } from 'rxjs';

@Injectable()
export class TrainingPlansDataEfects {
  loadTrainingPlansList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingPlansDataActions.LoadTrainingPlansList),
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

  deleteTrainingPlan$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingPlansDataActions.DeleteTrainingPlan),
      mergeMap(({ id }) =>
        this.httpDataService.deleteTrainingPlan(id).pipe(
          switchMap(() =>
            this.httpDataService.getTrainingPlansList().pipe(
              mergeMap((trainingPlansList) => {
                if (trainingPlansList.length > 0) {
                  return this.httpDataService
                    .getTrainingPlan(`${trainingPlansList[0].id}`)
                    .pipe(
                      map((trainingPlan) => {
                        return trainingPlansDataActions.SetTrainingPlanAndPlansList(
                          {
                            trainingPlansList,
                            trainingPlan,
                          }
                        );
                      })
                    );
                } else {
                  return of(
                    trainingPlansDataActions.SetTrainingPlanAndPlansList({
                      trainingPlansList: null,
                      trainingPlan: null,
                    })
                  );
                }
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
