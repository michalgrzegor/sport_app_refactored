import { Action, createReducer, on } from '@ngrx/store';
import * as MenuActions from './menu.actions';

export interface MenuState {
  isLeftMenuOpen: boolean;
  rightMenuComponent: string;
}

const InitialState: MenuState = {
  isLeftMenuOpen: true,
  rightMenuComponent: 'tp',
};

// export function MenuReducer(
//   state = InitialState,
//   action: MenuActions.MenuActions
// ): MenuState {
//   switch (action.type) {
//     case MenuActions.TOGGLE_LEFT_MENU:
//       return {
//         ...state,
//         isLeftMenuOpen: !state.isLeftMenuOpen,
//       };

//     case MenuActions.SET_RIGHT_MENU_COMPONENT:
//       return {
//         ...state,
//         rightMenuComponent: action.payload,
//       };

//     default:
//       return state;
//   }
// }

const menuReducer = createReducer(
  InitialState,
  on(MenuActions.ToggleLeftMenu, (state) => ({
    ...state,
    isLeftMenuOpen: !state.isLeftMenuOpen,
  })),
  on(MenuActions.SetRightMenuComponent, (state, { rightComponent }) => ({
    ...state,
    rightMenuComponent: rightComponent,
  }))
);

export function reducer(
  state: MenuState | undefined,
  action: Action
): MenuState {
  return menuReducer(state, action);
}
