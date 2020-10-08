import { Action, createAction, props } from '@ngrx/store';

// export const TOGGLE_LEFT_MENU = 'TOGGLE_LEFT_MENU';
// export const SET_RIGHT_MENU_COMPONENT = 'SET_RIGHT_MENU_COMPONENT';

// export class ToggleLeftMenu implements Action {
//   readonly type = TOGGLE_LEFT_MENU;
// }

// export class SetRightMenuComponent implements Action {
//   readonly type = SET_RIGHT_MENU_COMPONENT;
//   constructor(public payload: string) {}
// }
export const ToggleLeftMenu = createAction(
  '[Navigate module] TOGGLE_LEFT_MENU'
);
export const SetRightMenuComponent = createAction(
  '[Navigate module] SET_RIGHT_MENU_COMPONENT',
  props<{ rightComponent: string }>()
);
