import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from './store';

export const getFeeds = createAsyncThunk(
  'feeds/getAll',
  async () => await getFeedsApi()
);

type TFeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;

export const { selectOrders, selectTotal, selectTotalToday } =
  feedsSlice.selectors;
