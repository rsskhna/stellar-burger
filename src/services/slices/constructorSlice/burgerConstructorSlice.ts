import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

export const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBurgerComponent: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...ingredient } };
      }
    },
    deleteBurgerComponent: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const arrOfIngredients = state.constructorItems.ingredients;
      const ingredientIndex = arrOfIngredients.indexOf(action.payload);
      arrOfIngredients.splice(ingredientIndex, 1);
    },
    setIngredientsState: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.constructorItems.ingredients = action.payload;
    },
    setBunState: (
      state,
      action: PayloadAction<TConstructorIngredient | null>
    ) => {
      state.constructorItems.bun = action.payload;
    }
  },
  selectors: {
    selectBurgerBun: (state) => state.constructorItems.bun,
    selectBurgerIngredients: (state) => state.constructorItems.ingredients
  }
});

export const { selectBurgerBun, selectBurgerIngredients } =
  burgerConstructorSlice.selectors;
export const {
  addBurgerComponent,
  deleteBurgerComponent,
  setIngredientsState,
  setBunState
} = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
