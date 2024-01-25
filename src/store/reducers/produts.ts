/* eslint-disable no-param-reassign */
import { setProducts } from '@/store/actions/products';
import { ProductState } from '@/types/store.type';
import { createReducer } from '@reduxjs/toolkit';

const initialState: ProductState = {
  list: [],
};

const productReducer = createReducer(initialState, (builder) => {
  builder.addCase(setProducts, (state, action) => {
    state.list = action.payload.products;
  });
});

export default productReducer;
