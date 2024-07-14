import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse
} from '@api';
import { RootState } from './store';
import { TConstructorIngredient, TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk(
  'orders/getAll',
  async () => await getOrdersApi()
);

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

type TOrderState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
  orderRequest: false,
  loading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.loading = false;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
        console.log(state.error);
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        console.log(action.payload);
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const { selectUserOrders, selectOrderModalData, selectOrderRequest } =
  orderSlice.selectors;
