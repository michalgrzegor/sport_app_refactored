import { FormService } from './../../../shared/services/form.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tile-editor-training',
  templateUrl: './tile-editor-training.component.html',
  styleUrls: ['../../../shared/styles/_tile-editor.scss'],
})
export class TileEditorTrainingComponent implements OnInit, AfterViewInit {
  public tileTraining: FormGroup;
  @ViewChildren('formToExpand', { read: ViewContainerRef })
  formToExpandNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('expandBtn', { read: ViewContainerRef })
  expandBtnNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('input', { read: ViewContainerRef })
  inputNodesArray: QueryList<ViewContainerRef>;

  public intensityArray: string[] = [
    'km/h',
    'm/min',
    'min/km',
    'wat/min',
    'min/mile',
  ];
  public unitsArray: string[] = [
    'metres',
    'kilometres',
    'miles',
    'kilograms',
    'wats',
    'minute',
    'second',
    'hour',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.tileTraining = this.formBuilder.group({
      tile_title: ['', Validators.required],
      tile_type: ['training'],
      tile_description: [''],
      tile_activities_sets: [''],
      tile_activities_sets_rest_unit: [''],
      tile_activities_sets_rest_ammount: [''],
      tile_activities_sets_rest_intensity_unit: [''],
      tile_activities_sets_rest_intensity_ammount: [''],
      tile_activities: this.formBuilder.array([this.getTileActivities()]),
    });
  }

  ngAfterViewInit(): void {
    this.formService.addInputFuncionality(this.inputNodesArray);
  }

  private getTileActivities = () =>
    this.formBuilder.group({
      tile_activity_name: [''],
      tile_activity_reps: [''],
      tile_activity_unit: [''],
      tile_activity_amount: [''],
      tile_activity_intensity: [''],
      tile_activity_intensity_amount: [''],
      tile_activity_rest_unit: [''],
      tile_activity_rest_amount: [''],
      tile_activity_rest_intensity: [''],
      tile_activity_rest_intensity_amount: [''],
      tile_activity_note: [''],
      tile_activity_rest_after_activity_unit: [''],
      tile_activity_rest_after_activity_amount: [''],
      tile_activity_rest_after_activity_intensity: [''],
      tile_activity_rest_after_activity_intensity_amount: [''],
    });

  public createTile = () => {
    console.log(this.tileTraining.value);
  };

  public toggleForm = (index: number) =>
    this.formService.toggleForm(
      index,
      this.formToExpandNodesArray,
      this.expandBtnNodesArray
    );

  public removeActivity = (index: number) =>
    (this.tileTraining.get('tile_activities') as FormArray).removeAt(index);

  public addActivity = () => {
    (this.tileTraining.get('tile_activities') as FormArray).push(
      this.getTileActivities()
    );
  };
}
