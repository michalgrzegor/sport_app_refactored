// import { ModalService } from './../../../shared/components/modal/modal.service';
// import { NewTrainingPlan } from './../../../shared/models/new-training-plan';
// import {
//   Component,
//   OnInit,
//   QueryList,
//   ViewChildren,
//   ViewContainerRef,
// } from '@angular/core';
// import { FormService } from 'src/app/shared/services/form.service';

// @Component({
//   selector: 'app-calendar-creator',
//   templateUrl: './calendar-creator.component.html',
//   styleUrls: ['./calendar-creator.component.scss'],
// })
// export class CalendarCreatorComponent implements OnInit {
//   @ViewChildren('input', { read: ViewContainerRef })
//   inputNodesArray: QueryList<ViewContainerRef>;
//   public newTrainingPlan: NewTrainingPlan;
//   private key: string;

//   constructor(
//     private modalService: ModalService,
//     private formService: FormService
//   ) {
//     // this.newTrainingPlan = {
//     //   training_plan_name: null,
//     //   date_from: new Date(),
//     //   date_to: new Date(),
//     //   training_sesion_number: null,
//     // };
//   }

//   ngOnInit(): void {
//     this.newTrainingPlan = {
//       training_plan_name: null,
//       date_from: new Date(),
//       date_to: new Date(),
//       training_sesion_number: null,
//     };
//   }

//   ngAfterViewInit(): void {
//     this.formService.addInputFuncionality(this.inputNodesArray);
//   }

//   public createTrainingPlan = () =>
//     this.modalService.resolveModal(this.key, this.newTrainingPlan);
// }
import { ModalService } from './../../../shared/components/modal/modal.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-creator',
  templateUrl: './calendar-creator.component.html',
  styleUrls: ['./calendar-creator.component.scss'],
})
export class CalendarCreatorComponent implements OnInit, AfterViewInit {
  @ViewChildren('input', { read: ViewContainerRef })
  inputNodesArray: QueryList<ViewContainerRef>;

  public calendarCreatorForm: FormGroup;
  private key: string;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.calendarCreatorForm = this.formBuilder.group({
      training_plan_name: ['', Validators.required],
      date_from: ['', Validators.required],
      date_to: ['', Validators.required],
      training_sesion_number: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.formService.addInputFuncionality(this.inputNodesArray);
  }

  public createTrainingPlan = () =>
    this.modalService.resolveModal(this.key, this.calendarCreatorForm.value);
}
