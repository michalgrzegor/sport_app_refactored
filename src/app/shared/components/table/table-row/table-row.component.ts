import { Component, Input, OnInit } from '@angular/core';
import { AthleteInformations } from 'src/app/shared/models/athlete.interface';
import { TrainingPlanInfo } from 'src/app/shared/models/training-plan.interface';
import { LegendElement } from 'src/app/components/tp-menu/tp-menu.component';

export interface TableElement {
  name?: string;
  active?: boolean;
  icon_name?: string;
  tooltip_text?: string;
}

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
})
export class TableRowComponent implements OnInit {
  @Input() rowData: TrainingPlanInfo | AthleteInformations;
  @Input() tableLegend: LegendElement[] = [];
  @Input() isActive: boolean;
  public renderData: TableElement[];

  constructor() {}

  ngOnInit(): void {
    this.renderData = this.makeViewData(
      this.tableLegend,
      this.tableLegend.length > 2
        ? this.mapTrainingPlanData
        : this.mapAthleteInfoData
    );
  }

  private mapTrainingPlanData = (element: LegendElement) => {
    const rowData = this.rowData as TrainingPlanInfo;
    const tableElement: TableElement = {};
    switch (element.name) {
      case 'name':
        tableElement.name = rowData.training_plan_name;
        return tableElement;
      case 'active':
        rowData.training_plan_active
          ? ((tableElement.active = true),
            (tableElement.tooltip_text = `current athlete's program`))
          : ((tableElement.active = false),
            (tableElement.tooltip_text = 'inactive program'));
        tableElement.icon_name = 'panorama_fish_eye';
        return tableElement;
      case 'athlete':
        rowData.training_plan_athlete
          ? ((tableElement.active = true),
            (tableElement.tooltip_text = rowData.training_plan_athlete))
          : ((tableElement.active = false),
            (tableElement.tooltip_text = 'no assigned athlete'));
        tableElement.icon_name = 'face';
        return tableElement;
    }
  };

  private mapAthleteInfoData = (element: LegendElement) => {
    const rowData = this.rowData as AthleteInformations;
    const tableElement: TableElement = {};
    switch (element.name) {
      case 'name':
        tableElement.name = rowData.athlete_name;
        return tableElement;
      case 'program':
        rowData.activated_training_plan
          ? ((tableElement.active = true),
            (tableElement.tooltip_text =
              rowData.activated_training_plan.training_plan_name))
          : ((tableElement.active = false),
            (tableElement.tooltip_text = 'no assigned program'));
        tableElement.icon_name = 'assignment';
        return tableElement;
    }
  };

  private makeViewData = (
    data: LegendElement[],
    callback: (element: LegendElement) => TableElement
  ) => data.map(callback);
}
