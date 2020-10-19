import { Action, createReducer, on } from '@ngrx/store';
import {
  TrainingPlanInfo,
  TrainingPlan,
} from 'src/app/shared/models/training-plan.interface';
import * as TrainingPlansDataActions from '../actions/training-plans-data.actions';

export interface TrainingPlansDataState {
  trainingPlansLoading: boolean;
  trainingPlans: TrainingPlanInfo[];
  trainingPlanLoading: boolean;
  trainingPlan: TrainingPlan;
}

const InitialState: TrainingPlansDataState = {
  trainingPlansLoading: false,
  trainingPlans: null,
  trainingPlanLoading: true,
  trainingPlan: null,
};

const trainingPlansDataReducer = createReducer(
  InitialState,
  on(TrainingPlansDataActions.LoadingTrainingPlansList, (state) => ({
    ...state,
    trainingPlansLoading: true,
  })),
  on(
    TrainingPlansDataActions.SetTrainingPlansList,
    (state, { trainingPlansList }) => ({
      ...state,
      trainingPlansLoading: false,
      trainingPlans: [...trainingPlansList],
      trainingPlanLoading: trainingPlansList.length > 0 ? true : false,
    })
  ),
  on(TrainingPlansDataActions.LoadingTrainingPlan, (state) => ({
    ...state,
    trainingPlanLoading: true,
  })),
  on(TrainingPlansDataActions.SetTrainingPlan, (state, { trainingPlan }) => ({
    ...state,
    trainingPlanLoading: false,
    trainingPlan: { ...trainingPlan },
  })),
  on(
    TrainingPlansDataActions.SetTrainingPlanAndPlansList,
    (state, { trainingPlan, trainingPlansList }) => ({
      ...state,
      trainingPlanLoading: false,
      trainingPlan: { ...trainingPlan },
      trainingPlans: [...trainingPlansList],
    })
  )
);

export function reducer(
  state: TrainingPlansDataState | undefined,
  action: Action
): TrainingPlansDataState {
  return trainingPlansDataReducer(state, action);
}
