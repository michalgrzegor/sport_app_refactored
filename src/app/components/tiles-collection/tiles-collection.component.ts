import { Tile } from './../../shared/models/tile.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetTiles } from 'src/app/store/selectors/tile.selectors';

@Component({
  selector: 'app-tiles-collection',
  templateUrl: './tiles-collection.component.html',
  styleUrls: ['./tiles-collection.component.scss'],
})
export class TilesCollectionComponent implements OnInit {
  public tiles$: Observable<Tile[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.tiles$ = this.store.select(GetTiles);
  }
}
