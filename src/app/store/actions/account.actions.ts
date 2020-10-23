import { createAction, props } from '@ngrx/store';

export const SetAccountLevel = createAction(
  '[Auth API] SET_ACCOUNT_LEVEL',
  props<{
    accountLvl:
      | 'first_time'
      | 'trial'
      | 'paid_account'
      | 'trial_end'
      | 'athlete';
  }>()
);
