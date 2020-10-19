import { Action, createReducer, on } from '@ngrx/store';
import * as MenuActions from '../actions/menu.actions';

export interface MenuState {
  isLeftMenuOpen: boolean;
  rightMenuComponent: string;
}

const InitialState: MenuState = {
  isLeftMenuOpen: true,
  rightMenuComponent: 'tp',
};

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
