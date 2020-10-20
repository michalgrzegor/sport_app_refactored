import { createAction, props } from '@ngrx/store';
import { NewTrainingPlan } from 'src/app/shared/models/new-training-plan';
import {
  TrainingPlan,
  TrainingPlanInfo,
} from 'src/app/shared/models/training-plan.interface';

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
export const CreateNewTrainingPlan = createAction(
  '[Calendar API] CREATE_NEW_TRAINING_PLAN',
  props<{ newTrainingPlan: NewTrainingPlan }>()
);
export const SetTrainingPlanAndPlansList = createAction(
  '[Calendar module] SET_TRAINING_PLAN_AND_PLANS_LIST',
  props<{ trainingPlan: TrainingPlan; trainingPlansList: TrainingPlanInfo[] }>()
);
export const DeleteTrainingPlan = createAction(
  '[Calendar API] DELETE_TRAINING_PLAN',
  props<{ id: number }>()
);
