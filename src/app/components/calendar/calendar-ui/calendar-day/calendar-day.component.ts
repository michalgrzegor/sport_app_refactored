import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from 'src/app/shared/models/calendar.interface';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
  @Input() day: CalendarDay;
  @Input() isActualPage: boolean;

  constructor() {}

  ngOnInit(): void {}
}
