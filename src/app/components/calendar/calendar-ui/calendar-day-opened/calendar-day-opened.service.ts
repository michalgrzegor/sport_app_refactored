import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarDay } from 'src/app/shared/models/calendar.interface';
import { SetOpenedDay } from 'src/app/store/actions/calendar-data.actions';
import { CalendarDayOpenedComponent } from './calendar-day-opened.component';

@Injectable({
  providedIn: 'root',
})
export class CalendarDayOpenedService {
  private openedDay: ComponentRef<CalendarDayOpenedComponent>;
  private isInjected = false;

  constructor(
    private store: Store,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  public closeDay = () => {
    if (this.isInjected) {
      this.openedDay.destroy();
      this.isInjected = false;
    }
  };

  public openDay = (
    day: CalendarDay,
    componentToInject: ViewContainerRef,
    dataToInject: { [key: string]: string | number | Date }
  ): void => {
    this.closeDay();
    this.store.dispatch(SetOpenedDay({ calendarDay: day }));
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      CalendarDayOpenedComponent
    );
    const componentRef = componentToInject.createComponent(factory);
    componentRef.instance.trainingPlanData = dataToInject;
    componentRef.changeDetectorRef.detectChanges();
    this.openedDay = componentRef;
    this.isInjected = true;
  };
}
