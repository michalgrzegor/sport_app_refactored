import { createAction, props } from '@ngrx/store';
import {
  RedirectQuery,
  AccesTokenParams,
  SuccessfulAccesToken,
} from 'src/app/shared/models/auth.interface';

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

export const LogOut = createAction('[Auth Service] LOG_OUT');

export const HandleLogOut = createAction('[Auth Service] HANDLE_LOG_OUT');
