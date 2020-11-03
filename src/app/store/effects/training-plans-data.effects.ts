import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import * as trainingPlansDataActions from '../actions/training-plans-data.actions';
import { HttpTrainingPlanDataService } from 'src/app/shared/services/http-training-plan-data.service';
import { of } from 'rxjs';

@Injectable()
export class TrainingPlansDataEfects {
  loadTrainingPlansList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainingPlansDataActions.LoadTrainingPlansList),
      switchMap(() =>
        this.httpTrainingPlanDataService.getTrainingPlansList().pipe(
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
        this.httpTrainingPlanDataService
          .getTrainingPlan(`${data.payload}`)
          .pipe(
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
        this.httpTrainingPlanDataService
          .createTrainingPlan(newTrainingPlan)
          .pipe(
            switchMap((trainingPlan) =>
              this.httpTrainingPlanDataService.getTrainingPlansList().pipe(
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
        this.httpTrainingPlanDataService.deleteTrainingPlan(id).pipe(
          switchMap(() =>
            this.httpTrainingPlanDataService.getTrainingPlansList().pipe(
              mergeMap((trainingPlansList) => {
                if (trainingPlansList.length > 0) {
                  return this.httpTrainingPlanDataService
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
    private httpTrainingPlanDataService: HttpTrainingPlanDataService
  ) {}
}
