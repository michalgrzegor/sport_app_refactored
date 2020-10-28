import { shouldLoadingTiles } from './../../store/selectors/tile.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
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
        this.store.select(shouldLoadTrainingPlansList).subscribe((data) => {
          if (data) {
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

  private loadTrainingPlansList = () =>
    this.store.dispatch(fromTrainingPlansDataActions.LoadTrainingPlansList());

  private loadTrainingPlan = (id: number) =>
    this.store.dispatch(
      fromTrainingPlansDataActions.LoadTrainingPlan({ payload: `${id}` })
    );

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
