import { createAction, props } from '@ngrx/store';
import {
  AccesTokenParams,
  RedirectQuery,
  SuccessfulAccesToken,
} from '../models/auth.interface';

export const SetInAuthProcess = createAction(
  '[Auth Service] SET_IN_AUTH_PROCESS'
);
export const HandleRedirect = createAction(
  '[Redirect Component] HANDLE_REDIRECT'
);
export const HandleSuccess = createAction(
  '[Auth API] HANDLE_SUCCESS',
  props<{ redirectQuery: RedirectQuery }>()
);
export const HandleError = createAction(
  '[Auth API] HANDLE_ERROR',
  props<{ errorMessage: string }>()
);
export const GetAccesToken = createAction(
  '[Auth API] GET_ACCES_TOKEN',
  props<{ accesTokenParams: AccesTokenParams }>()
);
export const SetAccesToken = createAction(
  '[Auth Service] SET_ACCES_TOKEN',
  props<{ successfulResponse: SuccessfulAccesToken }>()
);
export const MakeRefreshToken = createAction(
  '[Auth Service] MAKE_REFRESH_TOKEN'
);
