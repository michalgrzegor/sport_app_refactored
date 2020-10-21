import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { CalendarDay } from 'src/app/shared/models/calendar.interface';
import { CalendarDayOpenedComponent } from './calendar-day-opened.component';

@Injectable({
  providedIn: 'root',
})
export class CalendarDayOpenedService {
  private openedDay: ComponentRef<CalendarDayOpenedComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public closeDay = () => this.openedDay.destroy();

  public openDay = (
    day: CalendarDay,
    componentToInject: ViewContainerRef
  ): void => {
    if (this.openedDay) {
      this.openedDay.destroy();
    }
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      CalendarDayOpenedComponent
    );
    const componentRef = componentToInject.createComponent(factory);
    componentRef.instance.day = day;
    componentRef.changeDetectorRef.detectChanges();
    this.openedDay = componentRef;
  };
}
