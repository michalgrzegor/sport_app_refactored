import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { ModalDataOptions } from 'src/app/shared/models/modal-options';
import { Tile } from 'src/app/shared/models/tile.interface';
import { TileAssociationsService } from 'src/app/shared/services/tile-associations.service';
import { GetTiles } from 'src/app/store/selectors/tile.selectors';

@Component({
  selector: 'app-tiles-collection-handset',
  templateUrl: './tiles-collection-handset.component.html',
  styleUrls: ['./tiles-collection-handset.component.scss'],
})
export class TilesCollectionHandsetComponent implements OnInit {
  public passData: ModalDataOptions;
  public tiles$: Observable<Tile[]>;
  public selectedTile: Tile;
  private key: string;

  constructor(
    private store: Store,
    private modalService: ModalService,
    private tileAssociationService: TileAssociationsService
  ) {}

  ngOnInit(): void {
    this.tiles$ = this.store.select(GetTiles);
    console.log(this.passData);
  }

  public selectTile = (tile: Tile) => {
    this.selectedTile = tile;
  };

  public addTile = () => {
    this.tileAssociationService.addAssociation(
      this.selectedTile,
      this.passData.sessionIndex,
      this.passData.sessionLength
    );
    this.modalService.closeModal(this.key);
  };
}
