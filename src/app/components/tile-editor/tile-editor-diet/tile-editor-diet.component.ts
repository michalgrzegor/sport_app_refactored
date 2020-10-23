import { FormService } from './../../../shared/services/form.service';
import { element } from 'protractor';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tile-editor-diet',
  templateUrl: './tile-editor-diet.component.html',
  styleUrls: ['../../../shared/styles/_tile-editor.scss'],
})
export class TileEditorDietComponent implements OnInit, AfterViewInit {
  @ViewChildren('formToExpand', { read: ViewContainerRef })
  formToExpandNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('expandBtn', { read: ViewContainerRef })
  expandBtnNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('input', { read: ViewContainerRef })
  inputNodesArray: QueryList<ViewContainerRef>;

  public tileDiet: FormGroup;
  public energyUnitsArray: string[] = ['kcal', 'kJ', 'g', 'mg'];

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.tileDiet = this.formBuilder.group({
      tile_title: ['', Validators.required],
      tile_type: ['diet'],
      tile_description: [''],
      tile_diets: this.formBuilder.array([this.getTileMeal()]),
    });
  }

  ngAfterViewInit(): void {
    this.formService.addInputFuncionality(this.inputNodesArray);
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

  public createTile = () => {
    console.log(this.tileDiet.value);
  };

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
}
