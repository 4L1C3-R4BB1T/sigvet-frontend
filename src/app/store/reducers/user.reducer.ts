import { createActionGroup, createReducer, on, props } from "@ngrx/store";
import { AppState } from "..";
import { User } from "../../models/user";


export const UserActions = createActionGroup({
  source: 'User Action',
  events: {
    'Set User Info': props<User | null>(),
  }
});

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
};

export const userReducer = createReducer(initialState,
  on(UserActions.setUserInfo, (state, props) => ({ ...state, user: props })),
)

export const USER_FEATURE_KEY = 'userReducer';

export const selectUserInfo = (state: AppState) => state.userReducer.user;
export const selectUserPhoto = (state: AppState) => state.userReducer.user?.photoUrl;
