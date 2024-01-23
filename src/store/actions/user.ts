import * as TYPES from '@/store/types';
import { UserAction } from '@/types/store.type';
import { createAction } from '@reduxjs/toolkit';

export const setLogged = createAction<UserAction>(TYPES.SET_LOGGED);
export const setLoggedOut = createAction<UserAction>(TYPES.SET_LOGGED_OUT);
