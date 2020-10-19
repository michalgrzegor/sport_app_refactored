import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fromTrainingPlansDataActions from '../../store/actions/training-plans-data.actions';
import {
  isTrainingPlanLoading,
  shouldLoadTrainingPlan,
  shouldLoadTrainingPlansList,
} from '../../store/selectors/training-plans-data.selectors';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {
  public isTrainingPlansLoading = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private changeDetector: ChangeDetectorRef
  ) {}

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
          .pipe(
            tap((data) => (this.isTrainingPlansLoading = !data))
            // tap(() => this._changeDetector.detectChanges())
          )
          .subscribe()
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
