import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

export interface AuthState {
  isInAuthProcess: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  error: string;
}

const InitialState: AuthState = {
  isInAuthProcess: false,
  isAuthenticated: false,
  accessToken: null,
  error: null,
};

const authReducer = createReducer(
  InitialState,
  on(authActions.SetInAuthProcess, (state) => ({
    ...state,
    isInAuthProcess: true,
  })),
  on(authActions.SetAccesToken, (state, { successfulResponse }) => ({
    ...state,
    isInAuthProcess: false,
    isAuthenticated: true,
    accessToken: successfulResponse.access_token,
  })),
  on(authActions.HandleError, (state, { errorMessage }) => ({
    ...state,
    error: errorMessage,
  }))
);

export function reducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return authReducer(state, action);
}
