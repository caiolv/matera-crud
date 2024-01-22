/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';

import { IUserState } from '../../types/store.type';
import { setLogged, setLoggedOut } from '../actions/user';

const initialState: IUserState = {
  info: null,
  isLoggedIn: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLogged, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.info = action.payload.user;
    })
    .addCase(setLoggedOut, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.info = action.payload.user;
    });
});

export default reducer;
