import { SharedComponentsModule } from './../../shared/components/shared-components.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarUiComponent } from './calendar-ui/calendar-ui.component';
import { CommonModule } from '@angular/common';
import { CalendarInfoComponent } from './calendar-info/calendar-info.component';
import { CalendarCreatorComponent } from './calendar-creator/calendar-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarDayComponent } from './calendar-ui/calendar-day/calendar-day.component';
import { CalendarDayOpenedComponent } from './calendar-ui/calendar-day-opened/calendar-day-opened.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarUiComponent,
    CalendarInfoComponent,
    CalendarCreatorComponent,
    CalendarDayComponent,
    CalendarDayOpenedComponent,
  ],
  imports: [
    CalendarRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ],
})
export class CalendarModule {}
