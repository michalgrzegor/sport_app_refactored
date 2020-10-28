import { Tile } from './../../../shared/models/tile.interface';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteTile, SetTileToEdit } from 'src/app/store/actions/tile.actions';
import { SetRightMenuComponent } from 'src/app/store/actions/menu.actions';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit, AfterViewInit {
  @Input('tile') tile: Tile;
  @Input('isInTileCollection') isInTileCollection: boolean;
  @ViewChild('tileElement', { read: ElementRef }) tileElement: ElementRef;
  @ViewChild('tileBody', { read: ElementRef }) tileBody: ElementRef;
  @ViewChild('tileStripe', { read: ElementRef }) tileStripe: ElementRef;

  public isOpen = false;

  constructor(private renderer: Renderer2, private store: Store) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(
      this.tileStripe.nativeElement,
      'background',
      `${this.tile.tile_type_color}`
    );
  }

  public toggleTile = () => {
    if (!this.isOpen) {
      this.renderer.setStyle(
        this.tileElement.nativeElement,
        'maxHeight',
        `${62 + this.tileBody.nativeElement.offsetHeight}px`
      );
    } else {
      this.renderer.setStyle(
        this.tileElement.nativeElement,
        'maxHeight',
        '72px'
      );
    }
    this.isOpen = !this.isOpen;
  };

  public editTile = () => {
    this.store.dispatch(SetTileToEdit({ tile: this.tile }));
    this.store.dispatch(
      SetRightMenuComponent({ rightComponent: 'tileeditor' })
    );
  };

  public deleteTile = () => {
    this.store.dispatch(DeleteTile({ tile: this.tile }));
  };
}
