import { createSelector } from '@ngrx/store';
import { AppState } from './app.reducers';

export const selectFeature = (state: AppState) => state.trainingPlansData;

export const isTrainingPlansListLoading = createSelector(
  selectFeature,
  (menu) => menu.trainingPlansLoading
);

export const getTrainingPlansList = createSelector(
  selectFeature,
  (menu) => menu.trainingPlans
);

export const shouldLoadTrainingPlansList = createSelector(
  selectFeature,
  (menu) => (!menu.trainingPlansLoading && !menu.trainingPlans ? true : false)
);

export const shouldLoadTrainingPlan = createSelector(selectFeature, (menu) => {
  if (
    menu.trainingPlanLoading &&
    !menu.trainingPlan &&
    menu.trainingPlans &&
    menu.trainingPlans.length > 0
  ) {
    return menu.trainingPlans[0].id;
  } else {
    return false;
  }
});

export const getTrainingPlan = createSelector(
  selectFeature,
  (menu) => menu.trainingPlan
);

export const getTrainingPlanName = createSelector(
  selectFeature,
  (menu) => menu.trainingPlan?.training_plan_name
);

export const isTrainingPlanLoading = createSelector(
  selectFeature,
  (menu) => menu.trainingPlanLoading
);

export const getTrainingPlanId = createSelector(selectFeature, (menu) =>
  menu.trainingPlan ? menu.trainingPlan.id : null
);
