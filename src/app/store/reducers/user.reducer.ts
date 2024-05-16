import { createActionGroup, createReducer, on, props } from "@ngrx/store";
import { AppState } from "..";

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  name: string;
  document: string;
  phone: string;
  specialty: string;
  crmv: string;
  crmvUf: string;
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
    'Set User Photo': props<{ url: string }>(),
  }
});

export interface UserState {
  user: UserInfo | null;
  photo: String | null;
}

const initialState: UserState = {
  user: null,
  photo: null,
};

export const userReducer = createReducer(initialState,
  on(UserActions.setUserInfo, (state, props) => ({ ...state, user: props })),
  on(UserActions.setUserPhoto, (state, props) => {
    return ({ ...state, photo: props.url });
  })
)

export const USER_FEATURE_KEY = 'userReducer';

export const selectUserInfo = (state: AppState) => state.userReducer.user;
export const selectUserPhoto = (state: AppState) => state.userReducer.photo;
