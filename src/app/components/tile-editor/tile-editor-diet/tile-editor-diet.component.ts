import { FormService } from './../../../shared/services/form.service';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  CreateTile,
  RemoveTileFromEdit,
  UpdateTile,
} from '../../../store/actions/tile.actions';
import { Subscription } from 'rxjs';
import { SetRightMenuComponent } from 'src/app/store/actions/menu.actions';
import { Tile } from 'src/app/shared/models/tile.interface';
import { TileEditorService } from '../tile-editor.service';

@Component({
  selector: 'app-tile-editor-diet',
  templateUrl: './tile-editor-diet.component.html',
  styleUrls: ['../../../shared/styles/_tile-editor.scss'],
})
export class TileEditorDietComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('formToExpand', { read: ViewContainerRef })
  formToExpandNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('expandBtn', { read: ViewContainerRef })
  expandBtnNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('input', { read: ViewContainerRef })
  inputNodesArray: QueryList<ViewContainerRef>;
  @Input() tileToEdit: Tile;

  public tileDiet: FormGroup;
  public energyUnitsArray: string[] = ['kcal', 'kJ', 'g', 'mg'];
  private subscription: Subscription = new Subscription();
  private id = 'diet';

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private tileEditorService: TileEditorService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.tileDiet = this.formBuilder.group({
      tile_title: ['', Validators.required],
      tile_type_name: ['diet'],
      tile_type_color: ['#88C540'],
      tile_type: ['diet'],
      tile_description: [''],
      id: [''],
      tile_diets: this.formBuilder.array([]),
    });
    if (this.tileToEdit && this.tileToEdit.tile_type_name === this.id) {
      this.patchForm();
    } else {
      this.addMeal();
    }
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.inputNodesArray.changes.subscribe(() =>
        this.formService.refreshEvents(this.inputNodesArray, this.id)
      )
    );
    this.formService.addInputFuncionality(this.inputNodesArray, this.id);
  }

  private getTileMeal = () =>
    this.formBuilder.group({
      tile_diet_meal: [''],
      tile_diet_energy_unit: [''],
      tile_diet_energy_amount: [''],
      tile_diet_carbohydrates_unit: [''],
      tile_diet_carbohydrates_amount: [''],
      tile_diet_protein_unit: [''],
      tile_diet_protein_amount: [''],
      tile_diet_fat_unit: [''],
      tile_diet_fat_amount: [''],
      id: [''],
    });

  public createTile = () => this.tileEditorService.createTile(this.tileDiet);

  public updateTile = () => this.tileEditorService.updateTile(this.tileDiet);

  private patchForm = () =>
    this.tileEditorService.patchForm(
      this.tileDiet,
      this.tileToEdit,
      this.getTileMeal
    );

  public toggleForm = (index: number) =>
    this.formService.toggleForm(
      index,
      this.formToExpandNodesArray,
      this.expandBtnNodesArray
    );

  public removeMeal = (index: number) =>
    (this.tileDiet.get('tile_diets') as FormArray).removeAt(index);

  public addMeal = () => {
    (this.tileDiet.get('tile_diets') as FormArray).push(this.getTileMeal());
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formService.removeListener(this.id);
    this.store.dispatch(RemoveTileFromEdit());
  }
}
