import { getCalendarData } from '../../../store/selectors/calendar-data.selectors';
import {
  CalendarCreatorService,
  CalendarDay,
} from '../../../shared/services/calendar-creator.service';
import {
  getTrainingPlan,
  getTrainingPlanId,
  getTrainingPlanName,
} from '../../../store/selectors/training-plans-data.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  SetPreviousPage,
  SetNextPage,
} from '../../../store/actions/calendar-data.actions';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { CalendarCreatorComponent } from '../calendar-creator/calendar-creator.component';
import { switchMap, tap } from 'rxjs/operators';
import * as fromCalendarDataActions from '../../../store/actions/calendar-data.actions';
import { CreateNewTrainingPlan } from 'src/app/store/actions/training-plans-data.actions';

@Component({
  selector: 'app-calendar-ui',
  templateUrl: './calendar-ui.component.html',
  styleUrls: ['./calendar-ui.component.scss'],
})
export class CalendarUiComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public calendarData$: Observable<CalendarDay[]>;
  public trainingPlanName$: Observable<string>;
  public trainingPlanId$: Observable<number>;

  constructor(
    private store: Store,
    private modalService: ModalService,
    private calendarCreator: CalendarCreatorService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(getTrainingPlan)
        .pipe(
          switchMap((trainingPlan) => {
            if (trainingPlan) {
              return this.calendarCreator.createCalendar(trainingPlan);
            } else {
              return;
            }
          }),
          tap((data) =>
            this.store.dispatch(
              fromCalendarDataActions.SetCalendarData({
                calendar: data as CalendarDay[],
              })
            )
          )
        )
        .subscribe()
    );
    this.calendarData$ = this.store.select(getCalendarData);
    this.trainingPlanName$ = this.store.select(getTrainingPlanName);
    this.trainingPlanId$ = this.store.select(getTrainingPlanId);
  }

  public openCreator = () => {
    this.modalService
      .instantinateModal(ModalComponent, CalendarCreatorComponent, {
        title: 'Training plan creator',
        style: [{ width: '400px' }],
      })
      .subscribe((data) => {
        if (data) {
          this.store.dispatch(CreateNewTrainingPlan({ newTrainingPlan: data }));
        }
      });
  };

  public previousMonth = () => this.store.dispatch(SetPreviousPage());

  public nextMonth = () => this.store.dispatch(SetNextPage());

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
