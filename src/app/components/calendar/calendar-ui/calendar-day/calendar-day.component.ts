import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
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
export class CalendarDayComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('colorDot', { read: ViewContainerRef })
  colorDotNodesArray: QueryList<ViewContainerRef>;
  @ViewChild('background', { read: ViewContainerRef })
  background: ViewContainerRef;
  @Input() day: CalendarDay;
  @Input() isActualPage: boolean;

  private subscription: Subscription = new Subscription();

  constructor(private store: Store, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.subscription.add(
      this.store
        .select(getOpenedDay)
        .pipe(
          map((cd) =>
            this.isActualPage
              ? cd
                ? isEqual(cd.date, this.day.date)
                : false
              : false
          )
        )
        .subscribe((isOpened) => this.addShadow(isOpened))
    );
    this.roteteColorDots(this.colorDotNodesArray);
  }

  private addShadow = (isOpened: boolean) => {
    if (isOpened) {
      this.renderer.addClass(this.background.element.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.background.element.nativeElement, 'open');
    }
  };

  private roteteColorDots = (nodesArray: QueryList<ViewContainerRef>) => {
    let numberOfDegree = 0;
    nodesArray.forEach((node) => {
      this.renderer.setStyle(
        node.element.nativeElement,
        'transform',
        `rotate(${numberOfDegree}deg)`
      );
      numberOfDegree += 15;
    });
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
