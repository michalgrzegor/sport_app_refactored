import { Association } from './../../../../shared/models/training-plan.interface';
import { CalendarDay } from './../../../../shared/models/calendar.interface';
import { GetTiles } from 'src/app/store/selectors/tile.selectors';
import { Tile } from './../../../../shared/models/tile.interface';
import { getOpenedDay } from './../../../../store/selectors/calendar-data.selectors';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AddTileToDay } from 'src/app/store/actions/calendar-data.actions';

@Component({
  selector: 'app-calendar-day-opened',
  templateUrl: './calendar-day-opened.component.html',
  styleUrls: ['./calendar-day-opened.component.scss'],
})
export class CalendarDayOpenedComponent implements OnInit, OnDestroy {
  public trainingPlanData: { [key: string]: string | number | Date };
  public day$: Observable<CalendarDay>;
  public tiles$: Observable<Tile[]>;

  private subscription: Subscription = new Subscription();
  public sessionArray: Tile[][] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'gridColumn', '1 / 8');
    this.day$ = this.store.select(getOpenedDay);
    this.tiles$ = this.store.select(GetTiles);
    this.subscription.add(
      combineLatest([this.day$, this.tiles$]).subscribe(
        ([calendarDay, tileArray]) => {
          this.sessionArray = this.makeSessionArray(calendarDay, tileArray);
        }
      )
    );
  }

  private makeSessionArray = (
    calendarDay: CalendarDay,
    tileArray: Tile[]
  ): Tile[][] => {
    const tiles = [
      ...tileArray.filter((tile) =>
        [...calendarDay.associations.map((a) => a.tile_id)].includes(tile.id)
      ),
    ];
    const array = [];
    for (let i = 0; i < calendarDay.trainingSessions; i++) {
      array.push([
        ...calendarDay.associations
          .filter((a) => a.training_sesion === i + 1)
          .map((a) => tiles.find((t) => t.id === a.tile_id)),
      ]);
    }
    return array;
  };

  public drop = (event: CdkDragDrop<Tile[]>, sessionIndex: number) => {
    if (event.previousContainer !== event.container) {
      const dropTile = event.previousContainer.data[event.previousIndex];
      const association: Association = {
        tile_id: dropTile.id,
        calendar_date: this.trainingPlanData.calendar_date as string,
        training_plan: this.trainingPlanData.training_plan as string,
        training_plan_id: this.trainingPlanData.training_plan_id as number,
        tile_color: dropTile.tile_type_color,
        training_sesion: sessionIndex + 1,
        tile_type: dropTile.tile_type_name,
        asso_index_in_array: event.previousContainer.data.length,
        asso_temporary_id: 0,
      };
      this.store.dispatch(AddTileToDay({ association }));
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
