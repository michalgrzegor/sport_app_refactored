import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftToolbarNavigatorComponent } from './left-toolbar-navigator.component';

describe('LeftToolbarNavigatorComponent', () => {
  let component: LeftToolbarNavigatorComponent;
  let fixture: ComponentFixture<LeftToolbarNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftToolbarNavigatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftToolbarNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
