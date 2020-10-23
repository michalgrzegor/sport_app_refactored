import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tile-editor-question',
  templateUrl: './tile-editor-question.component.html',
  styleUrls: ['../../../shared/styles/_tile-editor.scss'],
})
export class TileEditorQuestionComponent implements OnInit {
  public tileQuestion = this.formBuilder.group({
    tile_title: ['', Validators.required],
    tile_type: ['question'],
    tile_description: [''],
    tile_question: this.formBuilder.group({
      tile_ask_question: ['', Validators.required],
      tile_answer_numeric: ['', Validators.required],
      tile_answer_numeric_from: [''],
      tile_answer_numeric_to: [''],
      tile_answers_descriptives: [''],
    }),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  public createTile = () => {
    console.log(
      this.tileQuestion.get('tile_question').get('tile_answer_numeric').value
    );
  };
}
