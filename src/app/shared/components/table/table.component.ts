import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromTrainingPlansDataActions from '../../../store/actions/training-plans-data.actions';
import { Subscription } from 'rxjs';
import { getTrainingPlanId } from '../../../store/selectors/training-plans-data.selectors';
import { LegendElement } from '../../../components/tp-menu/tp-menu.component';
import { TrainingPlanInfo } from '../../models/training-plan.interface';
import { AthleteInformations } from '../../models/athlete.interface';
import { LoadingTrainingPlan } from '../../../store/actions/training-plans-data.actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tableLegend: LegendElement[];
  @Input() tableData: (TrainingPlanInfo | AthleteInformations)[];

  @ViewChild('row') row: ElementRef;

  private subscription: Subscription = new Subscription();
  private sortMultiplier = 1;
  public sortIndex: number = null;
  public activeId: string;

  constructor(private renderer: Renderer2, private store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.store
        .select(getTrainingPlanId)
        .subscribe((data) => (this.activeId = `${data}`))
    );
  }

  ngAfterViewInit(): void {
    this.renderer.listen(this.row.nativeElement, 'click', ($event) =>
      this.loadData($event)
    );
  }

  private sortByString = (sortBy: string, m: number) =>
    [...this.tableData].sort((a, b) => {
      const valA = a[sortBy] ? a[sortBy].toUpperCase() : 'a';
      const valB = b[sortBy] ? b[sortBy].toUpperCase() : 'a';
      return valA > valB ? 1 * m : valB > valA ? -1 * m : 0;
    });

  private sortByBoolean = (sortBy: string, m: number) =>
    [...this.tableData].sort((a, b) => {
      const valA = a[sortBy] ? true : false;
      const valB = b[sortBy] ? true : false;
      return valA === valB ? 0 : valA ? -1 * m : 1 * m;
    });

  public sortRows = (name: string, sortBy: string, index: number) => {
    const multiplier =
      index === this.sortIndex ? (this.sortMultiplier === -1 ? 1 : -1) : 1;
    this.sortMultiplier = multiplier;
    this.sortIndex = index;
    switch (name) {
      case 'athlete':
      case 'name':
        this.tableData = this.sortByString(sortBy, multiplier);
        break;
      default:
        this.tableData = this.sortByBoolean(sortBy, multiplier);
        break;
    }
  };

  private makeRequest = (id: string, type: string) => {
    switch (type) {
      case 'athlete':
        // tutaj odpala store athlete
        break;
      case 'program':
        this.store.dispatch(LoadingTrainingPlan());
        this.store.dispatch(
          fromTrainingPlansDataActions.LoadTrainingPlan({ payload: id })
        );
        break;
    }
  };

  private loadData = (event) => {
    if (event.path.find((element) => element.nodeName === 'APP-TABLE-ROW')) {
      const clickedElement: HTMLElement = event.path.filter(
        (el) => el.nodeName === 'APP-TABLE-ROW'
      )[0];
      const clickedElementID: string = clickedElement.getAttribute(
        'element-id'
      );
      const clickedElementType: string = clickedElement.getAttribute(
        'element-type'
      );
      this.makeRequest(clickedElementID, clickedElementType);
    }
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
