import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileEditorQuestionComponent } from './tile-editor-question.component';

describe('TileEditorQuestionComponent', () => {
  let component: TileEditorQuestionComponent;
  let fixture: ComponentFixture<TileEditorQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileEditorQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileEditorQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
