import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  add,
  sub,
  eachDayOfInterval,
  eachMonthOfInterval,
  getDay,
  isEqual,
  lastDayOfMonth,
} from 'date-fns';
import { map, mergeMap, reduce, toArray } from 'rxjs/operators';
import { TrainingPlan } from '../models/training-plan.interface';
import { CalendarDay } from '../models/calendar.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarCreatorService {
  public calendar: Observable<any>;
  private trainingPlan: TrainingPlan;
  constructor() {}

  private makeMonths = (trainingPlan: TrainingPlan): Date[] => {
    return eachMonthOfInterval({
      start: new Date(trainingPlan.date_from),
      end: new Date(trainingPlan.date_to),
    });
  };

  private makeMonth = (date: Date): Date[] =>
    eachDayOfInterval({
      start: date,
      end: lastDayOfMonth(date),
    });

  private addOriginalPage = (
    date: Date,
    index: number
  ): Partial<CalendarDay> => ({
    date,
    originalPage: index,
  });

  private addDayBeforeAndAfter = (
    month: Partial<CalendarDay>[]
  ): Partial<CalendarDay>[] => {
    const daysToAddToFinishLastWeek = 7 - getDay(month[month.length - 1].date);
    const daysToAddBefore =
      getDay(month[0].date) === 0 ? 6 : getDay(month[0].date) - 1;
    const daysToAddAfter =
      month.length + daysToAddBefore + daysToAddToFinishLastWeek < 42
        ? daysToAddToFinishLastWeek + 7
        : daysToAddToFinishLastWeek;
    for (let db = 0; db < daysToAddBefore; db++) {
      month.unshift({
        date: sub(month[0].date, {
          days: 1,
        }),
        originalPage: null,
      });
    }
    for (let da = 0; da < daysToAddAfter; da++) {
      month.push({
        date: add(month[month.length - 1].date, {
          days: 1,
        }),
        originalPage: null,
      });
    }
    return month;
  };

  private makePagination = (
    day: Partial<CalendarDay>,
    index: number
  ): Partial<CalendarDay> => ({
    ...day,
    page: [index],
  });

  private mergeDuplicate = (
    element: Partial<CalendarDay>,
    elementToMerge: Partial<CalendarDay>
  ): Partial<CalendarDay> => {
    element.page = [...element.page, ...elementToMerge.page];
    element.originalPage =
      element.originalPage !== null
        ? element.originalPage
        : elementToMerge.originalPage;
    return element;
  };

  private addData = (day: Partial<CalendarDay>) => {
    const associations = this.trainingPlan.calendar_assocs
      ? this.trainingPlan.calendar_assocs.filter((asso) =>
          isEqual(new Date(asso.calendar_date), day.date)
        )
      : [];
    const comments = this.trainingPlan.calendar_comments
      ? this.trainingPlan.calendar_comments.filter((comment) =>
          isEqual(new Date(comment.comment_day), day.date)
        )
      : [];
    day.associations = [...associations];
    day.comments = [...comments];
    day.trainingSessions = this.trainingPlan.training_sesion_number;
    return day;
  };

  private mergeDuplicatesAndAddData = (
    array: Partial<CalendarDay>[],
    currentElement: Partial<CalendarDay>
  ): Partial<CalendarDay>[] => {
    const day = this.addData(currentElement);
    const duplicateIndex = array.findIndex((el) => isEqual(el.date, day.date));
    duplicateIndex > -1
      ? (array[duplicateIndex] = this.mergeDuplicate(
          array[duplicateIndex],
          day
        ))
      : array.push(day);
    return array;
  };

  private createObservable = () => {
    this.calendar = from(this.makeMonths(this.trainingPlan));
    return this.calendar.pipe(
      map((data) => this.makeMonth(data)),
      mergeMap((data, index) =>
        from(data).pipe(
          map((date) => this.addOriginalPage(date, index)),
          toArray()
        )
      ),
      map((data) => this.addDayBeforeAndAfter(data)),
      mergeMap((data, index) =>
        from(data).pipe(map((day) => this.makePagination(day, index)))
      ),
      reduce(
        (array: Partial<CalendarDay>[], currentElement: Partial<CalendarDay>) =>
          this.mergeDuplicatesAndAddData(array, currentElement),
        []
      )
    );
  };

  public createCalendar = (
    trainingPlan: TrainingPlan
  ): Observable<Partial<CalendarDay>[]> => {
    this.trainingPlan = trainingPlan;
    return this.createObservable();
  };
}
