import { createAction, props } from '@ngrx/store';

export const ToggleLeftMenu = createAction(
  '[Navigate module] TOGGLE_LEFT_MENU'
);
export const SetRightMenuComponent = createAction(
  '[Navigate module] SET_RIGHT_MENU_COMPONENT',
  props<{ rightComponent: string }>()
);
