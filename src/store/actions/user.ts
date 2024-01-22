import { createAction } from '@reduxjs/toolkit';

import { UserAction } from '../../types/store.type';
import * as TYPES from '../types';

export const setLogged = createAction<UserAction>(TYPES.SET_LOGGED);
export const setLoggedOut = createAction<UserAction>(TYPES.SET_LOGGED_OUT);
