import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/ingredientsSlice/ingredientsSlice';
import { burgerConstructorReducer } from './slices/constructorSlice/burgerConstructorSlice';
import { feedsReducer } from './slices/feedsSlice/feedsSlice';
import { orderReducer } from './slices/orderSlice/ordersSlice';
import { userReducer } from './slices/userSlice/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feeds: feedsReducer,
  order: orderReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
