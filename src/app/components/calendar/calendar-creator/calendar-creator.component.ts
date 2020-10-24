import { ModalService } from './../../../shared/components/modal/modal.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
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
export class CalendarCreatorComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('input', { read: ViewContainerRef })
  inputNodesArray: QueryList<ViewContainerRef>;
  private id = 'tpcreator';

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
    this.formService.addInputFuncionality(this.inputNodesArray, this.id);
  }

  public createTrainingPlan = () =>
    this.modalService.resolveModal(this.key, this.calendarCreatorForm.value);

  ngOnDestroy(): void {
    this.formService.removeListener(this.id);
  }
}
