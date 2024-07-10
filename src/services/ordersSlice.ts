import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { RootState } from './store';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk(
  'orders/getAll',
  async () => await getOrdersApi()
);

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrder',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrdersState = {
  orders: TOrder[];
};

const initialState: TOrdersState = {
  orders: []
};

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
