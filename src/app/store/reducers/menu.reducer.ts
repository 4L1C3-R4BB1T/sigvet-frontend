import { createReducer, on } from "@ngrx/store";
import { toggle } from "../actions/menu.actions";
import { Menu } from "../models/menu.model";

const initialState: Menu = {
  show: true,
}

export const menuFeatureKey = 'menu';

export const menuReducer = createReducer(
  initialState,
  on(toggle, (state) => ({ show: !state.show })),
);
