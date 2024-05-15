import { MenuVisibilityState } from "./reducers/menu-visibility.reducer";
import { UserState } from "./reducers/user.reducer";

export interface AppState {
  menuVisibilityReducer: MenuVisibilityState;
  userReducer: UserState;
}
