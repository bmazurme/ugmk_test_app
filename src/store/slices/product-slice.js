/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import { productApiEndpoints } from '../api';

import { months, CULTURE } from '../../utils';

const initialState = {
  data: [],
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (
      state,
      { payload: data },
    ) => ({ ...state, data }),
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApiEndpoints.endpoints.getProducts.matchFulfilled,
        (state, action) => {
          const filteredFactory = (a, i, key) => a.filter((item) => ((item.factory_id.toString() === key)
            && (item.date?.split('/')[1] === (i + 1).toString())));

          const data = months[CULTURE].map((name, i) => ({
            name,
            factory_1: filteredFactory(action.payload, i, '1'),
            factory_2: filteredFactory(action.payload, i, '2'),
          }));

          return { ...state, data };
        },
      )
      .addMatcher(
        productApiEndpoints.endpoints.getProducts.matchRejected,
        (state, action) => {
          console.log('rejected', state, action);
        },
      );
  },
});

export const { setProduct } = slice.actions;

export default slice.reducer;

export const selectProduct = (state) => state.product.data;
