import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tile-editor',
  templateUrl: './tile-editor.component.html',
  styleUrls: ['./tile-editor.component.scss'],
})
export class TileEditorComponent implements OnInit {
  public editorName: 'training' | 'diet' | 'question';
  public editorNames = ['training', 'diet', 'question'];

  constructor() {}

  ngOnInit(): void {
    this.changeEditor('training');
  }

  public changeEditor = (type: 'training' | 'diet' | 'question') =>
    (this.editorName = type);
}
