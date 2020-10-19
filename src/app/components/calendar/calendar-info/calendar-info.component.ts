import { CreateNewTrainingPlan } from './../../../store/actions/training-plans-data.actions';
import { ModalComponent } from './../../../shared/components/modal/modal.component';
import { ModalService } from './../../../shared/components/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import { CalendarCreatorComponent } from '../calendar-creator/calendar-creator.component';
import { HttpDataService } from 'src/app/shared/services/http-data.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-calendar-info',
  templateUrl: './calendar-info.component.html',
  styleUrls: ['./calendar-info.component.scss'],
})
export class CalendarInfoComponent implements OnInit {
  constructor(
    private httpDataService: HttpDataService,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  public openMenu = () => {
    this.modalService
      .openModal(ModalComponent, CalendarCreatorComponent, {
        title: 'Training plan creator',
        style: [{ width: '400px' }],
      })
      .subscribe((data) => {
        if (data) {
          this.store.dispatch(CreateNewTrainingPlan({ newTrainingPlan: data }));
        }
      });
  };
}
