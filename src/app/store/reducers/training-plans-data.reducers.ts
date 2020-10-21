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
      trainingPlans: trainingPlansList ? [...trainingPlansList] : null,
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
    trainingPlan: trainingPlan ? { ...trainingPlan } : null,
  })),
  on(
    TrainingPlansDataActions.SetTrainingPlanAndPlansList,
    (state, { trainingPlan, trainingPlansList }) => ({
      ...state,
      trainingPlansLoading: false,
      trainingPlanLoading: false,
      trainingPlan: trainingPlan ? { ...trainingPlan } : null,
      trainingPlans: trainingPlansList ? [...trainingPlansList] : null,
    })
  )
);

export function reducer(
  state: TrainingPlansDataState | undefined,
  action: Action
): TrainingPlansDataState {
  return trainingPlansDataReducer(state, action);
}
