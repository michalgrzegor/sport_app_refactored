import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileEditorTrainingComponent } from './tile-editor-training.component';

describe('TileEditorTrainingComponent', () => {
  let component: TileEditorTrainingComponent;
  let fixture: ComponentFixture<TileEditorTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileEditorTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileEditorTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
