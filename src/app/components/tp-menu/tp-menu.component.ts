import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreakePointService } from '../../shared/services/breakpoint.service';

import { Store } from '@ngrx/store';
import * as fromTrainingPlansDataActions from '../../store/actions/training-plans-data.actions';
import {
  getTrainingPlansList,
  isTrainingPlansListLoading,
  shouldLoadTrainingPlansList,
} from '../../store/selectors/training-plans-data.selectors';
import { TrainingPlanInfo } from '../../shared/models/training-plan.interface';

export interface LegendElement {
  name: string;
  corenspondingValue: string;
}

@Component({
  selector: 'app-tp-menu',
  templateUrl: './tp-menu.component.html',
  styleUrls: ['./tp-menu.component.scss'],
})
export class TpMenuComponent implements OnInit, OnDestroy {
  public isWeb: boolean;
  public isTrainingPlansListLoading = true;
  public trainingPlanList: TrainingPlanInfo[];
  public tableLegend: LegendElement[];
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private breakPointService: BreakePointService
  ) {}

  ngOnInit(): void {
    this.tableLegend = [
      {
        name: 'name',
        corenspondingValue: 'training_plan_name',
      },
      {
        name: 'active',
        corenspondingValue: 'training_plan_active',
      },
      {
        name: 'athlete',
        corenspondingValue: 'training_plan_athlete',
      },
    ];
    this.subscription
      .add(
        this.breakPointService.isWeb.subscribe((data) => (this.isWeb = data))
      )
      .add(
        this.store.select(shouldLoadTrainingPlansList).subscribe((data) => {
          if (data) {
            this.loadTrainingPlansList();
          }
        })
      )
      .add(
        this.store
          .select(isTrainingPlansListLoading)
          .subscribe((data) => (this.isTrainingPlansListLoading = data))
      )
      .add(
        this.store.select(getTrainingPlansList).subscribe((data) => {
          this.trainingPlanList = data;
        })
      );
  }

  private loadTrainingPlansList = () =>
    this.store.dispatch(fromTrainingPlansDataActions.LoadTrainingPlansList());

  public closeTrainingPlansListBoard = () =>
    console.log(`close tp board in tablet and handset mode`);

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
