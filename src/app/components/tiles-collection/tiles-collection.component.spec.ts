import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesCollectionComponent } from './tiles-collection.component';

describe('TilesCollectionComponent', () => {
  let component: TilesCollectionComponent;
  let fixture: ComponentFixture<TilesCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilesCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
