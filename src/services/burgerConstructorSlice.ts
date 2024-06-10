import { TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
  loading: boolean;
  error: string | null;
};

const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  error: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  selectors: {
    getBurgerBun: (state) => state.constructorItems.bun,
    getBurgerIngredients: (state) => state.constructorItems.ingredients
  },
  extraReducers: (builder) => {}
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
