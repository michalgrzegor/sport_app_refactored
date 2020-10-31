import { TrainingPlan } from './../../shared/models/training-plan.interface';
import { getTrainingPlan } from './../../store/selectors/training-plans-data.selectors';
import { Tile } from './../../shared/models/tile.interface';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetTiles } from 'src/app/store/selectors/tile.selectors';

@Component({
  selector: 'app-tiles-collection',
  templateUrl: './tiles-collection.component.html',
  styleUrls: ['./tiles-collection.component.scss'],
})
export class TilesCollectionComponent implements OnInit, OnDestroy {
  public tiles$: Observable<Tile[]>;
  private subscription: Subscription = new Subscription();
  public cdkDropListConnectedTo: string[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tiles$ = this.store.select(GetTiles);
    this.subscription.add(
      this.store
        .select(getTrainingPlan)
        .subscribe((t) => (this.cdkDropListConnectedTo = this.makeList(t)))
    );
  }

  private makeList = (trainingPlan: TrainingPlan): string[] => {
    const array = [];
    for (let i = 0; i < trainingPlan.training_sesion_number; i++) {
      array.push(`list${i}`);
    }
    return array;
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
