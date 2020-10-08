import { getCalendarData } from '../../../shared/store/calendar-data.selectors';
import {
  CalendarCreatorService,
  CalendarDay,
} from '../../../shared/services/calendar-creator.service';
import {
  getTrainingPlan,
  getTrainingPlanName,
} from '../../../shared/store/training-plans-data.selectors';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCalendarDataActions from '../../../shared/store/calendar-data.actions';

@Component({
  selector: 'app-calendar-ui',
  templateUrl: './calendar-ui.component.html',
  styleUrls: ['./calendar-ui.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarUiComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public calendarData$: Observable<CalendarDay[]>;
  public trainingPlanName$: Observable<string>;

  constructor(
    private store: Store,
    private calendarCreator: CalendarCreatorService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(getTrainingPlan)
        // .pipe(
        //   switchMap((trainingPlan) => {
        //     console.log(trainingPlan);
        //     if (trainingPlan) {
        //       return this.calendarCreator.createCalendar(trainingPlan);
        //     } else {
        //       return;
        //     }
        //   }),
        //   tap((data) =>
        //     this.store.dispatch(
        //       fromCalendarDataActions.SetCalendarData({
        //         calendar: data as CalendarDay[],
        //       })
        //     )
        //   )
        // )
        .subscribe()
    );
    this.calendarData$ = this.store.select(getCalendarData);
    this.trainingPlanName$ = this.store.select(getTrainingPlanName);
  }

  public previousMonth = () =>
    this.store.dispatch(fromCalendarDataActions.SetPreviousPage());

  public nextMonth = () =>
    this.store.dispatch(fromCalendarDataActions.SetNextPage());

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
