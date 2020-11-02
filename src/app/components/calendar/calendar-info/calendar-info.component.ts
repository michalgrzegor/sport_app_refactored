import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuService } from './../../../shared/components/menu/menu.service';
import {
  CreateNewTrainingPlan,
  DeleteTrainingPlan,
  LoadingTrainingPlan,
  LoadingTrainingPlansList,
} from './../../../store/actions/training-plans-data.actions';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { getTrainingPlanName } from 'src/app/store/selectors/training-plans-data.selectors';
import { ModalMediatorService } from 'src/app/shared/components/modal/modal-mediator.service';

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
    private modalMediatorService: ModalMediatorService,
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

  private loadTrainingPlan = () => this.store.dispatch(LoadingTrainingPlan());

  private deleteTrainingPlanAction = () =>
    this.store.dispatch(DeleteTrainingPlan({ id: this.id }));

  private loadTrainingPlanList = () =>
    this.store.dispatch(LoadingTrainingPlansList());

  private openCreator = () =>
    this.modalMediatorService
      .OpenTrainingPlanCreator({
        title: 'Training plan creator',
        style: [{ width: '40rem' }],
      })
      .pipe(take(1))
      .subscribe((data) => {
        if (data) {
          this.loadTrainingPlan();
          this.store.dispatch(CreateNewTrainingPlan({ newTrainingPlan: data }));
        }
      });

  private deleteTrainingPlan = () => {
    this.loadTrainingPlanList();
    this.loadTrainingPlan();
    this.deleteTrainingPlanAction();
  };
}
