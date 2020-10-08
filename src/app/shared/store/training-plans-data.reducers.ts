import { Action, createReducer, on } from '@ngrx/store';
import {
  TrainingPlanInfo,
  TrainingPlan,
} from '../models/training-plan.interface';
import * as TrainingPlansDataActions from './training-plans-data.actions';

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

// export function TrainingPlansDataReducer(
//   state = InitialState,
//   action: TrainingPlansDataActions.TrainingPlansDataActions
// ): TrainingPlansDataState {
//   switch (action.type) {
//     // case TrainingPlansDataActions.LOADING_TRAINING_PLANS_LIST:
//     //   return {
//     //     ...state,
//     //     trainingPlansLoading: true,
//     //   };

//     // case TrainingPlansDataActions.SET_TRAINING_PLANS_LIST:
//     //   return {
//     //     ...state,
//     //     trainingPlansLoading: false,
//     //     trainingPlans: [...action.payload],
//     //     trainingPlanLoading: action.payload.length > 0 ? true : false,
//     //   };

//     case TrainingPlansDataActions.LOADING_TRAINING_PLAN:
//       return {
//         ...state,
//         trainingPlanLoading: true,
//       };

//     case TrainingPlansDataActions.SET_TRAINING_PLAN:
//       return {
//         ...state,
//         trainingPlanLoading: false,
//         trainingPlan: { ...action.payload },
//       };

//     default:
//       return state;
//   }
// }

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
  }))
);

export function reducer(
  state: TrainingPlansDataState | undefined,
  action: Action
): TrainingPlansDataState {
  return trainingPlansDataReducer(state, action);
}
