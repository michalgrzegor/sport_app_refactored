import { CalendarRoutingModule } from './calendar-routing.module';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';
import { CalendarUiComponent } from './calendar-ui/calendar-ui.component';
import { CommonModule } from '@angular/common';
import { CalendarInfoComponent } from './calendar-info/calendar-info.component';
import { CalendarCreatorComponent } from './calendar-creator/calendar-creator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarUiComponent,
    CalendarInfoComponent,
    CalendarCreatorComponent,
  ],
  imports: [CalendarRoutingModule, CommonModule, FormsModule],
})
export class CalendarModule {}
