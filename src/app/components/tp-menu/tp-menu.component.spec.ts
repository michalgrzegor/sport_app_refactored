import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpMenuComponent } from './tp-menu.component';

describe('TpMenuComponent', () => {
  let component: TpMenuComponent;
  let fixture: ComponentFixture<TpMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
