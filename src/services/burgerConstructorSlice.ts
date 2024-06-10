import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

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
  reducers: {
    addBurgerComponent: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
        console.log('add component action');
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
    }
  },
  selectors: {
    getBurgerBun: (state) => state.constructorItems.bun,
    getBurgerIngredients: (state) => state.constructorItems.ingredients
  }
});

export const { getBurgerBun, getBurgerIngredients } =
  burgerConstructorSlice.selectors;
export const { addBurgerComponent, deleteBurgerComponent } =
  burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
