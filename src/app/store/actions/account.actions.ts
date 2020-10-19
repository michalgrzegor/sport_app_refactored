import { Action, createAction, props } from '@ngrx/store';

// export const SET_ACCOUNT_LEVEL = 'SET_ACCOUNT_LEVEL';

// export class SetAccountLevel implements Action {
//   readonly type = SET_ACCOUNT_LEVEL;
//   constructor(
//     public payload:
//       | 'first_time'
//       | 'trial'
//       | 'paid_account'
//       | 'trial_end'
//       | 'athlete'
//   ) {}
// }

// export type AccountActions = SetAccountLevel;

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
