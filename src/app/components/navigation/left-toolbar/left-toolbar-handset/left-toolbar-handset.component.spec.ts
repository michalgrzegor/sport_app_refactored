import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftToolbarHandsetComponent } from './left-toolbar-handset.component';

describe('LeftToolbarHandsetComponent', () => {
  let component: LeftToolbarHandsetComponent;
  let fixture: ComponentFixture<LeftToolbarHandsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftToolbarHandsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftToolbarHandsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
