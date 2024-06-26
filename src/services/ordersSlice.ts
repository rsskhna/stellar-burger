import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const getOrders = createAsyncThunk(
  'orders/getAll',
  async () => await getOrdersApi()
);

type TOrdersState = {};

const initialState: TOrdersState = {};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {})
      .addCase(getOrders.rejected, (state, action) => {})
      .addCase(getOrders.fulfilled, (state, action) => {});
  }
});

export const ordersReducer = ordersSlice.reducer;

export const {} = ordersSlice.selectors;
