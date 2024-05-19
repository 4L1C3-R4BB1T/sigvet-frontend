import { createAction, createReducer, on } from "@ngrx/store";

export const WindowReloadPageAction = createAction('Window Reload Page');

export const WINDOW_FEATURE_KEY = 'windowReducer';

export const windowReducer = createReducer({},
  on(WindowReloadPageAction, state => {
    window?.location.reload();
    return state;
  })
);
