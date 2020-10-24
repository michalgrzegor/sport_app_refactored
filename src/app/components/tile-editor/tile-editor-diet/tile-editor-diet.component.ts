import { FormService } from './../../../shared/services/form.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateTile } from '../../../store/actions/tile.actions';
import { Subscription } from 'rxjs';

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

  public tileDiet: FormGroup;
  public energyUnitsArray: string[] = ['kcal', 'kJ', 'g', 'mg'];
  private subscription: Subscription = new Subscription();
  private id = 'diet';

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private formService: FormService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.tileDiet = this.formBuilder.group({
      tile_title: ['', Validators.required],
      tile_type_name: ['diet'],
      tile_type_color: ['#88C540'],
      tile_type: ['diet'],
      tile_description: [''],
      tile_diets: this.formBuilder.array([this.getTileMeal()]),
    });
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.inputNodesArray.changes.subscribe((changes) => {
        console.log(changes);
        this.formService.refreshEvents(this.inputNodesArray, this.id);
      })
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
    });

  public createTile = () =>
    this.store.dispatch(
      CreateTile({ data: { tile: this.tileDiet.value, type: 'diet' } })
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
  }
}
