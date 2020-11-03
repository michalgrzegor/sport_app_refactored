import {
  getTrainingPlan,
  getTrainingPlansList,
} from './../../store/selectors/training-plans-data.selectors';
import { SetShouldUpdateTrainingPlan } from './../../store/actions/tile.actions';
import {
  LoadingTrainingPlan,
  SetTrainingPlan,
  SetTrainingPlansList,
} from './../../store/actions/training-plans-data.actions';
import {
  shouldLoadingTiles,
  GetShouldUpdateTrainingPlan,
} from './../../store/selectors/tile.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import * as fromTrainingPlansDataActions from '../../store/actions/training-plans-data.actions';
import {
  isTrainingPlanLoading,
  shouldLoadTrainingPlan,
  shouldLoadTrainingPlansList,
} from '../../store/selectors/training-plans-data.selectors';
import { GetTiles } from 'src/app/store/actions/tile.actions';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  public isTrainingPlansLoading = false;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription
      .add(
        this.store
          .select(shouldLoadTrainingPlansList)
          .subscribe((shouldLoad) => {
            if (shouldLoad) {
              this.loadTrainingPlansList();
            }
          })
      )
      .add(
        this.store.select(shouldLoadTrainingPlan).subscribe((data) => {
          if (data) {
            this.loadTrainingPlan(data);
          }
        })
      )
      .add(
        this.store
          .select(GetShouldUpdateTrainingPlan)
          .pipe(
            map((shouldLoad) => {
              console.log(shouldLoad);
              if (shouldLoad) {
                this.upDateTrainingPlan();
              }
            })
          )
          .subscribe()
      )
      .add(
        this.store
          .select(isTrainingPlanLoading)
          .pipe(tap((data) => (this.isTrainingPlansLoading = !data)))
          .subscribe()
      )
      .add(
        this.store.select(shouldLoadingTiles).subscribe((data) => {
          if (data) {
            this.store.dispatch(GetTiles());
          }
        })
      );
  }

  private upDateTrainingPlan = () =>
    this.store
      .select(getTrainingPlan)
      .pipe(
        take(1),
        tap(() => this.store.dispatch(LoadingTrainingPlan())),
        map((trainingPlan) => this.loadTrainingPlan(trainingPlan.id))
      )
      .subscribe();

  private loadTrainingPlansList = () =>
    this.store.dispatch(fromTrainingPlansDataActions.LoadTrainingPlansList());

  private loadTrainingPlan = (id: number) => {
    this.store.dispatch(
      fromTrainingPlansDataActions.LoadTrainingPlan({ payload: `${id}` })
    );
    this.setShouldUpdateTrainingPlan();
  };

  private setShouldUpdateTrainingPlan = () =>
    this.store.dispatch(SetShouldUpdateTrainingPlan({ setUpdate: false }));

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
