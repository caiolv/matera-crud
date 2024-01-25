/* eslint-disable prettier/prettier */
import { ProductsAction } from '@/types/store.type';
import { createAction } from '@reduxjs/toolkit';

import * as TYPES from '../types';

export const setProducts = createAction<ProductsAction>(TYPES.SET_PRODUCTS);
