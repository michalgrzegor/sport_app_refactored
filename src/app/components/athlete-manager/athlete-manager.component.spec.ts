import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteManagerComponent } from './athlete-manager.component';

describe('AthleteManagerComponent', () => {
  let component: AthleteManagerComponent;
  let fixture: ComponentFixture<AthleteManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
