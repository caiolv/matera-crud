/* eslint-disable no-param-reassign */
import {
  addLastSeen,
  addProduct,
  changeFilter,
  deleteProduct,
  editProduct,
  setPage,
  setProducts,
} from '@/store/actions/products';
import { ProductState } from '@/types/store.type';
import { createReducer } from '@reduxjs/toolkit';

const initialState: ProductState = {
  list: [],
  currentPage: 1,
  lastSeen: [],
  filter: '',
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProducts, (state, action) => {
      state.list = action.payload.products;
    })
    .addCase(addProduct, (state, action) => {
      state.list.push(action.payload.product);
    })
    .addCase(editProduct, (state, action) => {
      const index = state.list.findIndex(
        (product) => product.id === action.payload.product.id,
      );
      state.list[index] = action.payload.product;
    })
    .addCase(setPage, (state, action) => {
      state.currentPage = action.payload.page;
    })
    .addCase(addLastSeen, (state, action) => {
      const index = state.lastSeen.findIndex(
        (product) => product.id === action.payload.product.id,
      );

      if (index >= 0) {
        state.lastSeen.splice(index, 1);
      }
      state.lastSeen.unshift(action.payload.product);
    })
    .addCase(deleteProduct, (state, action) => {
      const indexLastSeen = state.lastSeen.findIndex(
        (product) => product.id === action.payload.product.id,
      );
      const indexList = state.list.findIndex(
        (product) => product.id === action.payload.product.id,
      );
      state.lastSeen.splice(indexLastSeen, 1);
      state.list.splice(indexList, 1);
    })
    .addCase(changeFilter, (state, action) => {
      state.filter = action.payload;
    });
});

export default productReducer;
