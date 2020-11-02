import { ModalOptions } from './../../models/modal-options';
import { ModalComponent } from './modal.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';
import { CalendarCreatorComponent } from 'src/app/components/calendar/calendar-creator/calendar-creator.component';
import { TilesCollectionHandsetComponent } from 'src/app/components/tiles-collection/tiles-collection-handset/tiles-collection-handset.component';
import { TileEditorComponent } from 'src/app/components/tile-editor/tile-editor.component';
import { TilesCollectionComponent } from 'src/app/components/tiles-collection/tiles-collection.component';

@Injectable({
  providedIn: 'root',
})
export class ModalMediatorService {
  constructor(private modalService: ModalService) {}

  private openModal = (
    key: string,
    component: any,
    modalOptions: ModalOptions
  ): Observable<any> =>
    this.modalService.instantinateModal(
      key,
      ModalComponent,
      component,
      modalOptions
    );

  public OpenTrainingPlanCreator = (modalOptions: ModalOptions) =>
    this.openModal(
      'trainingPlanCreator',
      CalendarCreatorComponent,
      modalOptions
    );

  public OpenTilesCollectionHandset = (modalOptions: ModalOptions) =>
    this.openModal(
      'tilesCollectionHandset',
      TilesCollectionHandsetComponent,
      modalOptions
    );

  public OpenTileEditorComponent = (modalOptions: ModalOptions) =>
    this.openModal('tileEditor', TileEditorComponent, modalOptions);

  public OpenTilesCollectionComponent = (modalOptions: ModalOptions) =>
    this.openModal('tilesCollection', TilesCollectionComponent, modalOptions);

  public closeModal = (key: string) => this.modalService.closeModal(key);
}
