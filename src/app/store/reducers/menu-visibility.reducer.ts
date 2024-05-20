import { createActionGroup, createReducer, emptyProps, on, props } from "@ngrx/store";
import { AppState } from "..";


export const SidenavActions = createActionGroup({
  source: 'Sidenav Actions',
  events: {
    'Toggle Menu': emptyProps(),
  },
});

export const ProfileActions = createActionGroup({
  source: 'Profile Actions',
  events: {
    'Toggle Modal': emptyProps(),
  },
});


export interface MenuVisibilityState {
  menuSidenav: boolean;
  modalProfile: boolean;
}

const initialState: MenuVisibilityState = {
  menuSidenav: false,
  modalProfile: false,
}

export const MENU_VISIBILITY_FEATURE_KEY = 'menuVisibilityReducer';

export default createReducer(
  initialState,
  on(SidenavActions.toggleMenu, state => ({ ...state, menuSidenav: !state.menuSidenav })),
  on(ProfileActions.toggleModal, state => ({ ...state, modalProfile: !state.modalProfile }))
)

export const selectMenuSidenavValue = (state: AppState) => state.menuVisibilityReducer.menuSidenav;
