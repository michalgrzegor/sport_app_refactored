import { Observable } from 'rxjs';
import { MenuService } from './../../../shared/components/menu/menu.service';
import {
  CreateNewTrainingPlan,
  DeleteTrainingPlan,
  LoadingTrainingPlan,
  LoadingTrainingPlansList,
} from './../../../store/actions/training-plans-data.actions';
import { ModalComponent } from './../../../shared/components/modal/modal.component';
import { ModalService } from './../../../shared/components/modal/modal.service';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CalendarCreatorComponent } from '../calendar-creator/calendar-creator.component';
import { Store } from '@ngrx/store';
import { getTrainingPlanName } from 'src/app/store/selectors/training-plans-data.selectors';

@Component({
  selector: 'app-calendar-info',
  templateUrl: './calendar-info.component.html',
  styleUrls: ['./calendar-info.component.scss'],
})
export class CalendarInfoComponent implements OnInit {
  @ViewChild('button_menu', { read: ViewContainerRef })
  buttonMenu: ViewContainerRef;
  @Input()
  id: number;
  public trainingPlanName$: Observable<string>;

  constructor(
    private menuService: MenuService,
    private modalService: ModalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.trainingPlanName$ = this.store.select(getTrainingPlanName);
  }

  public openMenu = (event: MouseEvent) => {
    this.menuService.instantinateMenu(
      event.clientX,
      event.clientY,
      {
        menuElementList: [
          {
            name: 'creator',
            callback: this.openCreator,
          },
          {
            name: 'delete plan',
            callback: this.deleteTrainingPlan,
          },
        ],
      },
      this.buttonMenu
    );
  };

  private openCreator = () => {
    this.modalService
      .instantinateModal(ModalComponent, CalendarCreatorComponent, {
        title: 'Training plan creator',
        style: [{ width: '400px' }],
      })
      .subscribe((data) => {
        if (data) {
          this.store.dispatch(LoadingTrainingPlan());
          this.store.dispatch(CreateNewTrainingPlan({ newTrainingPlan: data }));
        }
      });
  };

  private deleteTrainingPlan = () => {
    this.store.dispatch(LoadingTrainingPlansList());
    this.store.dispatch(LoadingTrainingPlan());
    this.store.dispatch(DeleteTrainingPlan({ id: this.id }));
  };
}
