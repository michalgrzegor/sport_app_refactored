import { Component, Input, OnInit } from '@angular/core';
import { CalendarDay } from 'src/app/shared/services/calendar-creator.service';

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
