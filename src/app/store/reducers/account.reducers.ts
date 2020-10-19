import { Action, createReducer, on } from '@ngrx/store';
import * as AccountActions from '../actions/account.actions';

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
