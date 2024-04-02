import { createReducer, on } from "@ngrx/store";
import { toggle } from "../actions/setting-menu.action";
import SettingMenu from "../models/setting-menu.model";

const initialState: SettingMenu = {
  open: false
}

export const settingMenuFeatureKey = 'settingMenu';

export const settingMenuReducer = createReducer(initialState, on(toggle, state => ({ ...state, open: !state.open })))
