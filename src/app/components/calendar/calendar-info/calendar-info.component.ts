import { MenuService } from './../../../shared/components/menu/menu.service';
import { CreateNewTrainingPlan } from './../../../store/actions/training-plans-data.actions';
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

@Component({
  selector: 'app-calendar-info',
  templateUrl: './calendar-info.component.html',
  styleUrls: ['./calendar-info.component.scss'],
})
export class CalendarInfoComponent {
  @ViewChild('button_menu', { read: ViewContainerRef })
  buttonMenu: ViewContainerRef;
  @Input()
  id: number;

  constructor(
    private menuService: MenuService,
    private modalService: ModalService,
    private store: Store
  ) {}

  // ngOnInit(): void {}

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
          this.store.dispatch(CreateNewTrainingPlan({ newTrainingPlan: data }));
        }
      });
  };

  private deleteTrainingPlan = () => {
    console.log(`delete ${this.id}`);
  };
}
