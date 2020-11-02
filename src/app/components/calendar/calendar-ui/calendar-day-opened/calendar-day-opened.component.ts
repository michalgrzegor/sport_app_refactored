import { BreakePointService } from './../../../../shared/services/breakpoint.service';
import { Association } from './../../../../shared/models/training-plan.interface';
import { CalendarDay } from './../../../../shared/models/calendar.interface';
import { GetTiles } from 'src/app/store/selectors/tile.selectors';
import { Tile } from './../../../../shared/models/tile.interface';
import {
  getIsCalendarDataLoading,
  getOpenedDay,
} from './../../../../store/selectors/calendar-data.selectors';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  AddTileToDay,
  SetIsCalendarDataLoading,
} from 'src/app/store/actions/calendar-data.actions';

@Component({
  selector: 'app-calendar-day-opened',
  templateUrl: './calendar-day-opened.component.html',
  styleUrls: ['./calendar-day-opened.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayOpenedComponent implements OnInit, OnDestroy {
  public trainingPlanData: { [key: string]: string | number | Date };
  public day$: Observable<CalendarDay>;
  public tiles$: Observable<Tile[]>;
  public isTilesLoading$: Observable<boolean>;
  public isWeb$: Observable<boolean>;

  private subscription: Subscription = new Subscription();
  public sessionArray: { tile: Tile; association: Association }[][] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store,
    private breakPointService: BreakePointService
  ) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'gridColumn', '1 / 8');
    this.day$ = this.store.select(getOpenedDay);
    this.tiles$ = this.store.select(GetTiles);
    this.isTilesLoading$ = this.store.select(getIsCalendarDataLoading);
    this.isWeb$ = this.breakPointService.isWeb;
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
  ): { tile: Tile; association: Association }[][] => {
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
          .map((a) => ({
            tile: tiles.find((t) => t.id === a.tile_id),
            association: a,
          })),
      ]);
    }
    return array;
  };

  private makeTileAssociation = (
    dropTile: Tile,
    session: number,
    indexInArray: number
  ): Association => ({
    tile_id: dropTile.id,
    calendar_date: this.trainingPlanData.calendar_date as string,
    training_plan: this.trainingPlanData.training_plan as string,
    training_plan_id: this.trainingPlanData.training_plan_id as number,
    tile_color: dropTile.tile_type_color,
    training_sesion: session,
    tile_type: dropTile.tile_type_name,
    asso_index_in_array: indexInArray,
    asso_temporary_id: 0,
  });

  private setIsCalendarDataLoading = (): void =>
    this.store.dispatch(
      SetIsCalendarDataLoading({ isCalendarDataLoading: true })
    );

  private addTileToDay = (association: Association): void =>
    this.store.dispatch(AddTileToDay({ association }));

  public drop = (event: CdkDragDrop<Tile[]>, sessionIndex: number): void => {
    if (event.previousContainer !== event.container) {
      this.setIsCalendarDataLoading();
      const dropTile = event.previousContainer.data[event.previousIndex];
      const association = this.makeTileAssociation(
        dropTile,
        sessionIndex + 1,
        event.previousContainer.data.length
      );
      this.addTileToDay(association);
    }
  };

  public addTile = () => {};

  // public getAssociation = (id: number) => this.associations.find(a => a.tile_id === )

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
