/* eslint-disable no-param-reassign */

import { setLogged, setLoggedOut } from '@/store/actions/user';
import { IUserState } from '@/types/store.type';
import { createReducer } from '@reduxjs/toolkit';

const initialState: IUserState = {
  info: null,
  isLoggedIn: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLogged, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.info = action.payload.user;
    })
    .addCase(setLoggedOut, (state) => {
      state.isLoggedIn = false;
      state.info = null;
    });
});

export default userReducer;
