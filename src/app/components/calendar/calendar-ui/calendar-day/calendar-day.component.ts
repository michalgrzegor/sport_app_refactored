import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarDay } from 'src/app/shared/models/calendar.interface';
import { isEqual } from 'date-fns';
import { getOpenedDay } from 'src/app/store/selectors/calendar-data.selectors';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayComponent implements OnInit, AfterViewInit {
  @Input() day: CalendarDay;
  @Input() isActualPage: boolean;

  public isOpened$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.isOpened$ = this.store
      .select(getOpenedDay)
      .pipe(map((cd) => isEqual(cd.date, this.day.date)));
  }
}
