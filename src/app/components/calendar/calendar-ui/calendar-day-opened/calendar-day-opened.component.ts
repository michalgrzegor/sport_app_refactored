import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CalendarDay } from 'src/app/shared/models/calendar.interface';

@Component({
  selector: 'app-calendar-day-opened',
  templateUrl: './calendar-day-opened.component.html',
  styleUrls: ['./calendar-day-opened.component.scss'],
})
export class CalendarDayOpenedComponent implements OnInit {
  public day: CalendarDay;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'gridColumn', '1 / 8');
  }
}
