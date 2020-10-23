import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileEditorDietComponent } from './tile-editor-diet.component';

describe('TileEditorDietComponent', () => {
  let component: TileEditorDietComponent;
  let fixture: ComponentFixture<TileEditorDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileEditorDietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileEditorDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
