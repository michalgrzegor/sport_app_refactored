import { FormService } from './../../../shared/services/form.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CreateTile } from '../../../store/actions/tile.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tile-editor-question',
  templateUrl: './tile-editor-question.component.html',
  styleUrls: ['../../../shared/styles/_tile-editor.scss'],
})
export class TileEditorQuestionComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('input', { read: ViewContainerRef })
  inputNodesArray: QueryList<ViewContainerRef>;

  public tileQuestion: FormGroup;
  private id = 'question';
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.tileQuestion = this.formBuilder.group({
      tile_title: ['', Validators.required],
      tile_type_name: ['question'],
      tile_type_color: ['#E8A022'],
      tile_type: ['question'],
      tile_description: [''],
      tile_question: this.formBuilder.group({
        tile_ask_question: ['', Validators.required],
        tile_answer_numeric: [''],
        tile_answer_numeric_from: [''],
        tile_answer_numeric_to: [''],
        tile_answers_descriptives: [''],
      }),
    });
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.inputNodesArray.changes.subscribe((changes) =>
        this.formService.refreshEvents(this.inputNodesArray, this.id)
      )
    );
    this.formService.addInputFuncionality(this.inputNodesArray, this.id);
  }

  public createTile = () =>
    this.store.dispatch(
      CreateTile({ data: { tile: this.tileQuestion.value, type: 'question' } })
    );

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formService.removeListener(this.id);
  }
}
