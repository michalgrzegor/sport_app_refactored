import { Action, createReducer, on } from '@ngrx/store';
import * as AccountActions from './account.actions';

export interface AccountState {
  accountLevel:
    | 'first_time'
    | 'trial'
    | 'paid_account'
    | 'trial_end'
    | 'athlete';
}

const InitialState: AccountState = {
  accountLevel: null,
};

// export function AccountReducer(
//   state = InitialState,
//   action: AccountActions.AccountActions
// ): AccountState {
//   switch (action.type) {
//     case AccountActions.SET_ACCOUNT_LEVEL:
//       return {
//         ...state,
//         accountLevel: action.payload,
//       };

//     default:
//       return state;
//   }
// }

const accountReducer = createReducer(
  InitialState,
  on(AccountActions.SetAccountLevel, (state, { accountLvl }) => ({
    ...state,
    accountLevel: accountLvl,
  }))
);

export function reducer(
  state: AccountState | undefined,
  action: Action
): AccountState {
  return accountReducer(state, action);
}
