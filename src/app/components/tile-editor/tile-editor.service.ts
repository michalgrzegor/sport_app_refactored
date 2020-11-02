import { take, tap } from 'rxjs/operators';
import { BreakePointService } from './../../shared/services/breakpoint.service';
import { Tile } from './../../shared/models/tile.interface';
import { FormArray, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetRightMenuComponent } from 'src/app/store/actions/menu.actions';
import { CreateTile, UpdateTile } from 'src/app/store/actions/tile.actions';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { ModalMediatorService } from 'src/app/shared/components/modal/modal-mediator.service';

@Injectable({
  providedIn: 'root',
})
export class TileEditorService {
  constructor(
    private store: Store,
    private modalMediatorService: ModalMediatorService,
    private breakPointService: BreakePointService
  ) {}

  private changeToTileCollection = (): void =>
    this.store.dispatch(
      SetRightMenuComponent({ rightComponent: 'tilecollection' })
    );

  private checkValidation = (form: FormGroup): boolean => {
    form.markAllAsTouched();
    return form.valid;
  };

  public createTile = (form: FormGroup): void => {
    this.breakPointService.isWeb
      .pipe(
        take(1),
        tap((isWeb) => {
          if (isWeb && this.checkValidation(form)) {
            this.store.dispatch(CreateTile({ tile: form.value }));
            this.changeToTileCollection();
          } else if (!isWeb && this.checkValidation(form)) {
            this.store.dispatch(CreateTile({ tile: form.value }));
            this.modalMediatorService.closeModal('tileEditor');
          }
        })
      )
      .subscribe();
    if (this.checkValidation(form)) {
    }
  };

  public updateTile = (form: FormGroup): void => {
    this.breakPointService.isWeb
      .pipe(
        take(1),
        tap((isWeb) => {
          if (isWeb && this.checkValidation(form)) {
            this.store.dispatch(UpdateTile({ tile: form.value }));
            this.changeToTileCollection();
          } else if (!isWeb && this.checkValidation(form)) {
            this.store.dispatch(UpdateTile({ tile: form.value }));
            this.modalMediatorService.closeModal('tileEditor');
          }
        })
      )
      .subscribe();
  };

  private getArray = (tile: Tile): string => {
    switch (tile.tile_type_name) {
      case 'diet':
        return 'tile_diets';
      case 'training':
        return 'tile_activities';
      case 'question':
        return null;
    }
  };

  public patchForm = (
    form: FormGroup,
    data: Tile,
    callback: () => FormGroup
  ): void => {
    if (this.getArray(data)) {
      data[this.getArray(data)].forEach(() => {
        (form.get(this.getArray(data)) as FormArray).push(callback());
      });
    }
    form.patchValue(data);
  };
}
