import { createReducer, on } from "@ngrx/store";
import { ModalCreateAccount } from "../models/modal-create-account.model";
import { actionModalCreateAccount } from "../actions/modal-create-account.action";

const initialState: ModalCreateAccount = {
  isShown: false,
};


export const modalCreateAccountFeatureKey = 'accountModal';

export const modalCreateAccountReducer = createReducer(
  initialState,
  on(actionModalCreateAccount, ({ isShown }) => ({ isShown: !isShown}) )
)
