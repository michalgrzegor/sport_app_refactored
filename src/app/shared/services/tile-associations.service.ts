import { getOpenedDay } from './../../store/selectors/calendar-data.selectors';
import { Association } from './../models/training-plan.interface';
import { getTrainingPlan } from './../../store/selectors/training-plans-data.selectors';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddTileToDay,
  SetIsCalendarDataLoading,
} from 'src/app/store/actions/calendar-data.actions';
import { Tile } from '../models/tile.interface';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TileAssociationsService {
  constructor(private store: Store) {}

  private makeTileAssociation = (
    dropTile: Tile,
    session: number,
    indexInArray: number
  ): Observable<Association> =>
    this.store.select(getTrainingPlan).pipe(
      mergeMap((trainingPlan) =>
        this.store.select(getOpenedDay).pipe(
          map((openedDay) => ({
            tile_id: dropTile.id,
            calendar_date: `${openedDay.date}`,
            training_plan: trainingPlan.training_plan_name as string,
            training_plan_id: trainingPlan.id as number,
            tile_color: dropTile.tile_type_color,
            training_sesion: session,
            tile_type: dropTile.tile_type_name,
            asso_index_in_array: indexInArray,
            asso_temporary_id: 0,
          }))
        )
      )
    );

  private setIsCalendarDataLoading = (): void =>
    this.store.dispatch(
      SetIsCalendarDataLoading({ isCalendarDataLoading: true })
    );

  private addTileToDay = (association: Association): void =>
    this.store.dispatch(AddTileToDay({ association }));

  public addAssociation = (
    tile: Tile,
    sessionIndex: number,
    sessionLength: number
  ) => {
    this.setIsCalendarDataLoading();
    this.makeTileAssociation(tile, sessionIndex + 1, sessionLength)
      .pipe(
        take(1),
        tap((association) => this.addTileToDay(association))
      )
      .subscribe();
  };
}
