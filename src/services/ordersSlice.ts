import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { RootState } from './store';

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

// export const selectOrderByNumber =
//   (number: number | undefined) => (state: RootState) =>
//     state.ingredients.ingredients.find((item) => item._id === id);
