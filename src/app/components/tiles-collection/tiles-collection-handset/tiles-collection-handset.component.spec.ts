import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesCollectionHandsetComponent } from './tiles-collection-handset.component';

describe('TilesCollectionHandsetComponent', () => {
  let component: TilesCollectionHandsetComponent;
  let fixture: ComponentFixture<TilesCollectionHandsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilesCollectionHandsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TilesCollectionHandsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
