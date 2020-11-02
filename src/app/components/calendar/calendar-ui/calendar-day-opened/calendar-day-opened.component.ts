import { TileAssociationsService } from './../../../../shared/services/tile-associations.service';
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
import { ModalMediatorService } from 'src/app/shared/components/modal/modal-mediator.service';
import { take, tap } from 'rxjs/operators';

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
  private day: CalendarDay;
  public sessionArray: { tile: Tile; association: Association }[][] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private store: Store,
    private tileAssociationService: TileAssociationsService,
    private modalMediatorService: ModalMediatorService,
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
          this.day = calendarDay;
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

  public drop = (event: CdkDragDrop<Tile[]>, sessionIndex: number): void => {
    if (event.previousContainer !== event.container) {
      const dropTile = event.previousContainer.data[event.previousIndex];
      this.tileAssociationService.addAssociation(
        dropTile,
        sessionIndex,
        event.previousContainer.data.length
      );
    }
  };

  public addTile = (sessionIndex: number, sessionLength: number) =>
    this.modalMediatorService
      .OpenTilesCollectionHandset({
        title: `Add tile to ${sessionIndex + 1} session`,
        style: [{ height: '80vh' }, { width: '90vw' }],
        data: { sessionIndex, day: this.day, sessionLength },
      })
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.modalMediatorService.closeModal('tilesCollectionHandset');
        }
      });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
