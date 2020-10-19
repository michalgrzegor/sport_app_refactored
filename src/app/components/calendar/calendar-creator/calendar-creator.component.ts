import { ModalService } from './../../../shared/components/modal/modal.service';
import { NewTrainingPlan } from './../../../shared/models/new-training-plan';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-creator',
  templateUrl: './calendar-creator.component.html',
  styleUrls: ['./calendar-creator.component.scss'],
})
export class CalendarCreatorComponent implements OnInit {
  public newTrainingPlan: NewTrainingPlan;
  private key: string;

  constructor(private modalService: ModalService) {
    this.newTrainingPlan = {
      training_plan_name: null,
      date_from: new Date(),
      date_to: new Date(),
      training_sesion_number: 1,
    };
  }

  ngOnInit(): void {}

  public createTrainingPlan = () =>
    this.modalService.resolveModal(this.key, this.newTrainingPlan);
}
