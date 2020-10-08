import { CalendarRoutingModule } from './calendar-routing.module';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarUiComponent } from './calendar-ui/calendar-ui.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CalendarComponent, CalendarUiComponent],
  imports: [CalendarRoutingModule, CommonModule],
})
export class CalendarModule {}
