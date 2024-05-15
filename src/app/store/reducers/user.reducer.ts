import { createActionGroup, createReducer, on, props } from "@ngrx/store";
import { AppState } from "..";

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  name: string;
  document: string;
  phone: string;
  address?: {
    id: number;
    street: string;
    neighborhood: string;
    zipCode: string;
    number: number;
    city: {
      id: number;
      name: string;
      state: {
        id: string;
        name: string;
      }
    }
  },
  roles: string[];
}

export const UserActions = createActionGroup({
  source: 'User Action',
  events: {
    'Set User Info': props<UserInfo | null>(),
  }
});

export interface UserState {
  user: UserInfo | null;
}

const initialState: UserState = {
  user: null,
};

export const userReducer = createReducer(initialState,
  on(UserActions.setUserInfo, (state, props) => ({ ...state, user: props }))
)

export const USER_FEATURE_KEY = 'userReducer';

export const selectUserInfo = (state: AppState) => state.userReducer.user;

