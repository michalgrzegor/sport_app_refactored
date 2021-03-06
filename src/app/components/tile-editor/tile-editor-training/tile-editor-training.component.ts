import { TileEditorService } from './../tile-editor.service';
import { Tile } from './../../../shared/models/tile.interface';
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
import { RemoveTileFromEdit } from '../../../store/actions/tile.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tile-editor-training',
  templateUrl: './tile-editor-training.component.html',
  styleUrls: ['../../../shared/styles/_tile-editor.scss'],
})
export class TileEditorTrainingComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public tileTraining: FormGroup;
  private subscription: Subscription = new Subscription();
  private id = 'training';
  @ViewChildren('formToExpand', { read: ViewContainerRef })
  formToExpandNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('expandBtn', { read: ViewContainerRef })
  expandBtnNodesArray: QueryList<ViewContainerRef>;
  @ViewChildren('input', { read: ViewContainerRef })
  inputNodesArray: QueryList<ViewContainerRef>;
  @Input() tileToEdit: Tile;

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
    private formService: FormService,
    private tileEditorService: TileEditorService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.tileTraining = this.formBuilder.group({
      tile_title: ['', Validators.required],
      tile_type_name: ['training'],
      tile_type_color: ['#FF5D51'],
      tile_type: ['training'],
      tile_description: [''],
      tile_activities_sets: [''],
      tile_activities_sets_rest_unit: [''],
      tile_activities_sets_rest_ammount: [''],
      tile_activities_sets_rest_intensity_unit: [''],
      tile_activities_sets_rest_intensity_ammount: [''],
      id: [''],
      tile_activities: this.formBuilder.array([]),
    });
    if (this.tileToEdit && this.tileToEdit.tile_type_name === this.id) {
      this.patchForm();
    } else {
      this.addActivity();
    }
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.inputNodesArray.changes.subscribe((changes) =>
        this.formService.refreshEvents(this.inputNodesArray, this.id)
      )
    );
    this.formService.addInputFuncionality(this.inputNodesArray, this.id);
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
      id: [''],
    });

  public createTile = () =>
    this.tileEditorService.createTile(this.tileTraining);

  public updateTile = () =>
    this.tileEditorService.updateTile(this.tileTraining);

  private patchForm = () =>
    this.tileEditorService.patchForm(
      this.tileTraining,
      this.tileToEdit,
      this.getTileActivities
    );

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formService.removeListener(this.id);
    this.store.dispatch(RemoveTileFromEdit());
  }
}
