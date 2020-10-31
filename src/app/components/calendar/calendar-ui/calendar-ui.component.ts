import { SetOpenedDay } from './../../../store/actions/calendar-data.actions';
import { TrainingPlan } from './../../../shared/models/training-plan.interface';
import { CalendarDayOpenedService } from './calendar-day-opened/calendar-day-opened.service';
import { getActualPage } from './../../../store/selectors/calendar-data.selectors';
import { getCalendarData } from '../../../store/selectors/calendar-data.selectors';
import { CalendarCreatorService } from '../../../shared/services/calendar-creator.service';
import {
  getTrainingPlan,
  getTrainingPlanId,
  getTrainingPlanName,
} from '../../../store/selectors/training-plans-data.selectors';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
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
import { CalendarDay } from 'src/app/shared/models/calendar.interface';

@Component({
  selector: 'app-calendar-ui',
  templateUrl: './calendar-ui.component.html',
  styleUrls: ['./calendar-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarUiComponent implements OnInit, OnDestroy {
  @ViewChildren('day', { read: ViewContainerRef }) dayNodesArray: QueryList<
    ViewContainerRef
  >;
  private subscription: Subscription = new Subscription();
  public calendarData$: Observable<CalendarDay[]>;
  public trainingPlanName$: Observable<string>;
  public trainingPlanId$: Observable<number>;
  public actualPage$: Observable<number>;
  private openedDayIndex: number;
  private dataForOpenDay: { [key: string]: string | number | Date };
  private actualPage: number;

  constructor(
    private store: Store,
    private modalService: ModalService,
    private calendarCreator: CalendarCreatorService,
    private calendarDayOpenedService: CalendarDayOpenedService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(getTrainingPlan)
        .pipe(
          tap((data) => (this.dataForOpenDay = this.setDataForOpenDay(data))),
          switchMap((trainingPlan) => {
            if (trainingPlan) {
              return this.calendarCreator.createCalendar(trainingPlan);
            } else {
              return of(null);
            }
          }),
          tap((data) => {
            if (data) {
              this.resetCalendarData();
              this.store.dispatch(
                fromCalendarDataActions.SetCalendarData({
                  calendar: data as CalendarDay[],
                })
              );
            }
          })
        )
        .subscribe()
    );
    this.calendarData$ = this.store.select(getCalendarData);
    this.trainingPlanName$ = this.store.select(getTrainingPlanName);
    this.trainingPlanId$ = this.store.select(getTrainingPlanId);
    this.actualPage$ = this.store
      .select(getActualPage)
      .pipe(tap((page) => (this.actualPage = page)));
  }

  public openCreator = () => {
    this.modalService
      .instantinateModal(ModalComponent, CalendarCreatorComponent, {
        title: 'Training plan creator',
        style: [{ width: '40rem' }],
      })
      .subscribe((data) => {
        if (data) {
          this.store.dispatch(CreateNewTrainingPlan({ newTrainingPlan: data }));
        }
      });
  };

  public previousMonth = () => {
    this.store.dispatch(SetPreviousPage());
    this.calendarDayOpenedService.closeDay();
  };

  public nextMonth = () => {
    this.store.dispatch(SetNextPage());
    this.calendarDayOpenedService.closeDay();
  };

  private resetCalendarData = () =>
    this.store.dispatch(SetOpenedDay({ calendarDay: null }));

  private setDataForOpenDay = (
    trainingPlan: TrainingPlan
  ): { [key: string]: string | number } => {
    return {
      training_plan: trainingPlan.training_plan_name,
      training_plan_id: trainingPlan.id,
    };
  };

  public openDay = (index: number, day: CalendarDay) => {
    if (this.openedDayIndex === index && this.actualPage === day.originalPage) {
      this.calendarDayOpenedService.closeDay();
      this.openedDayIndex = null;
    } else if (
      this.openedDayIndex !== index &&
      this.actualPage === day.originalPage
    ) {
      this.dataForOpenDay.calendar_date = day.date;
      this.openedDayIndex = index;
      const elementIndex = Math.ceil((index + 1) / 7) * 7 - 1;
      const componentToInject = this.dayNodesArray.toArray()[elementIndex];
      this.calendarDayOpenedService.openDay(
        day,
        componentToInject,
        this.dataForOpenDay
      );
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
