import { Action, createAction, props } from '@ngrx/store';
import {
  TrainingPlanInfo,
  TrainingPlan,
} from '../models/training-plan.interface';

// export const LOADING_TRAINING_PLANS_LIST = 'LOADING_TRAINING_PLANS_LIST';
// export const LOADING_TRAINING_PLANS_LIST_FAILED =
//   'LOADING_TRAINING_PLANS_LIST_FAILED';
// export const LOAD_TRAINING_PLANS_LIST = 'LOAD_TRAINING_PLANS_LIST';
// export const SET_TRAINING_PLANS_LIST = 'SET_TRAINING_PLANS_LIST';
// export const LOADING_TRAINING_PLAN = 'LOADING_TRAINING_PLAN';
// export const LOADING_TRAINING_PLAN_FAILED = 'LOADING_TRAINING_PLAN_FAILED';
// export const LOAD_TRAINING_PLAN = 'LOAD_TRAINING_PLAN';
// export const SET_TRAINING_PLAN = 'SET_TRAINING_PLAN';

// export class LoadingTrainingPlansList implements Action {
//   readonly type = LOADING_TRAINING_PLANS_LIST;
// }

// export class LoadingTrainingPlansListFailed implements Action {
//   readonly type = LOADING_TRAINING_PLANS_LIST_FAILED;
// }

// export class LoadTrainingPlansList implements Action {
//   readonly type = LOAD_TRAINING_PLANS_LIST;
// }

// export class SetTrainingPlansList implements Action {
//   readonly type = SET_TRAINING_PLANS_LIST;
//   constructor(public payload: TrainingPlanInfo[]) {}
// }

// export class LoadingTrainingPlan implements Action {
//   readonly type = LOADING_TRAINING_PLAN;
// }

// export class LoadingTrainingPlanFailed implements Action {
//   readonly type = LOADING_TRAINING_PLAN_FAILED;
// }

// export class LoadTrainingPlan implements Action {
//   readonly type = LOAD_TRAINING_PLAN;
//   constructor(public payload: string) {}
// }

// export class SetTrainingPlan implements Action {
//   readonly type = SET_TRAINING_PLAN;
//   constructor(public payload: TrainingPlan) {}
// }

export const LoadingTrainingPlansList = createAction(
  '[Calendar module] LOADING_TRAINING_PLANS_LIST'
);
export const LoadingTrainingPlansListFailed = createAction(
  '[Calendar API] LOADING_TRAINING_PLANS_LIST_FAILED'
);
export const LoadTrainingPlansList = createAction(
  '[Calendar API] LOAD_TRAINING_PLANS_LIST'
);
export const SetTrainingPlansList = createAction(
  '[Calendar module] SET_TRAINING_PLANS_LIST',
  props<{ trainingPlansList: TrainingPlanInfo[] }>()
);
export const LoadingTrainingPlan = createAction(
  '[Calendar module] LOADING_TRAINING_PLAN'
);
export const LoadingTrainingPlanFailed = createAction(
  '[Calendar API] LOADING_TRAINING_PLAN_FAILED'
);
export const LoadTrainingPlan = createAction(
  '[Calendar API] LOAD_TRAINING_PLAN',
  props<{ payload: string }>()
);
export const SetTrainingPlan = createAction(
  '[Calendar module] SET_TRAINING_PLAN',
  props<{ trainingPlan: TrainingPlan }>()
);
