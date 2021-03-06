import { take, tap } from 'rxjs/operators';
import { Association } from './../../../shared/models/training-plan.interface';
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
import {
  RemoveTileFromDay,
  SetIsCalendarDataLoading,
} from 'src/app/store/actions/calendar-data.actions';
import { BreakePointService } from 'src/app/shared/services/breakpoint.service';
import { ModalMediatorService } from 'src/app/shared/components/modal/modal-mediator.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit, AfterViewInit {
  @Input() tile: Tile;
  @Input() isInTileCollection: boolean;
  @Input() isInHandsetCollection: boolean;
  @Input() association: Association;
  @ViewChild('tileElement', { read: ElementRef }) tileElement: ElementRef;
  @ViewChild('tileBody', { read: ElementRef }) tileBody: ElementRef;
  @ViewChild('tileStripe', { read: ElementRef }) tileStripe: ElementRef;

  public isOpen = false;

  constructor(
    private renderer: Renderer2,
    private store: Store,
    private breakePointService: BreakePointService,
    private modalMediatorService: ModalMediatorService
  ) {}

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
        '7.2rem'
      );
    }
    this.isOpen = !this.isOpen;
  };

  private setRightMenu = () =>
    this.store.dispatch(
      SetRightMenuComponent({ rightComponent: 'tileeditor' })
    );

  private setIsCalendarDataLoading = () =>
    this.store.dispatch(
      SetIsCalendarDataLoading({ isCalendarDataLoading: true })
    );

  private openTileEditor = () =>
    this.modalMediatorService.OpenTileEditorComponent({
      title: 'Tile Editor',
      style: [{ height: '80vh' }, { width: '90vw' }],
    });

  public editTile = () => {
    this.store.dispatch(SetTileToEdit({ tile: this.tile }));
    this.breakePointService.isWeb
      .pipe(
        take(1),
        tap((isWeb) => {
          if (isWeb) {
            this.setRightMenu();
          } else {
            this.modalMediatorService.closeModal('tilesCollection');
            this.openTileEditor();
          }
        })
      )
      .subscribe();
  };

  public deleteTile = () => {
    if (this.isInTileCollection) {
      this.store.dispatch(DeleteTile({ tile: this.tile }));
    } else {
      this.setIsCalendarDataLoading();
      this.store.dispatch(RemoveTileFromDay({ association: this.association }));
    }
  };
}
