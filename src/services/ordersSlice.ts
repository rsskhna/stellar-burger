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

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

type TOrderState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  orderInfo: TOrder | null;
  requestLoading: boolean;
  ordersLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
  orderRequest: false,
  orderInfo: null,
  requestLoading: false,
  ordersLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectUserOrders: (state) => state.orders,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrdersLoading: (state) => state.ordersLoading,
    selectOrderInfo: (state) => state.orderInfo
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.requestLoading = true;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.requestLoading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.requestLoading = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.ordersLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.ordersLoading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.ordersLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.ordersLoading = false;
        state.orderInfo = action.payload.orders[0];
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const {
  selectUserOrders,
  selectOrderModalData,
  selectOrderRequest,
  selectOrdersLoading,
  selectOrderInfo
} = orderSlice.selectors;
