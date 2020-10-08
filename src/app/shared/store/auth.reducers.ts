import { Action, createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

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

// export function AuthReducer(
//   state = InitialState,
//   action: authActions.AuthActions
// ): AuthState {
//   switch (action.type) {
//     case authActions.SET_IN_AUTH_PROCESS:
//       return {
//         ...state,
//         isInAuthProcess: true,
//       };

//     case authActions.SET_ACCES_TOKEN:
//       console.log(action.payload);
//       return {
//         ...state,
//         isInAuthProcess: false,
//         isAuthenticated: true,
//         accessToken: action.payload.access_token,
//       };

//     case authActions.HANDLE_ERROR:
//       console.log(action.payload);
//       return {
//         ...state,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// }

const authReducer = createReducer(
  InitialState,
  on(authActions.SetInAuthProcess, (state) => ({
    ...state,
    isInAuthProcess: true,
  })),
  on(authActions.SetAccesToken, (state, { successfulResponse }) => {
    console.log(successfulResponse);
    return {
      ...state,
      isInAuthProcess: false,
      isAuthenticated: true,
      accessToken: successfulResponse.access_token,
    };
  }),
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
