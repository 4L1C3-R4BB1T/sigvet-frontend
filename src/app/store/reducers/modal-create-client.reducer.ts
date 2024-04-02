import { createReducer, on } from '@ngrx/store';
import { toggleCreateClientModal } from '../actions/modal-create-client.action';
import { ModalCreateClient } from '../models/modal-create-client.modal';

const initialState: ModalCreateClient = {
  open: false,
};

export const modalCreateClientFeatureKey = 'clientModal';

export const modalCreateClientReducer = createReducer(
  initialState,
  on(toggleCreateClientModal, (state) => ({ ...state, open: !state.open }))
);
