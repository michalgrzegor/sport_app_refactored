import { Tile } from './../../shared/models/tile.interface';
import { GetTileToEdit } from './../../store/selectors/tile.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.scss'],
})
export class TileEditorComponent implements OnInit, OnDestroy {
  public editorName: string = 'training';
  public editorNames = ['training', 'diet', 'question'];
  public tileToEdit: Tile;

  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(GetTileToEdit)
        .pipe(
          tap((tile) => {
            if (tile) {
              this.changeEditor(tile.tile_type_name);
            }
          })
        )
        .subscribe((tile) => (this.tileToEdit = tile))
    );
  }

  public changeEditor = (type: string) => (this.editorName = type);

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
