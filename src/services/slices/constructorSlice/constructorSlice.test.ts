import { expect, jest } from '@jest/globals';
import {
  addBurgerComponent,
  burgerConstructorReducer,
  deleteBurgerComponent,
  setBunState,
  setIngredientsState,
  initialState
} from './burgerConstructorSlice';

describe('constructorReducer actions tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const ingredientsMock = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    }
  ];

  it('add bun to constructor', () => {
    const newState = burgerConstructorReducer(
      initialState,
      addBurgerComponent(ingredientsMock[0])
    );

    const { constructorItems } = newState;

    expect(constructorItems.bun).not.toBeNull();
    expect(constructorItems.bun).toEqual({
      ...ingredientsMock[0],
      id: expect.any(String)
    });
  });

  it('add/delete ingredient', () => {
    const addedIngredient = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      id: 'someId'
    };

    const filledState = {
      constructorItems: {
        bun: null,
        ingredients: [addedIngredient]
      }
    };

    const newState = burgerConstructorReducer(
      filledState,
      deleteBurgerComponent(addedIngredient)
    );

    expect(newState).toEqual(initialState);
  });

  it('set bun/ingredient state', () => {
    const stateWithIngredient = burgerConstructorReducer(
      initialState,
      setIngredientsState([{ ...ingredientsMock[0], id: 'ingr' }])
    );

    const stateWithBun = burgerConstructorReducer(
      stateWithIngredient,
      setBunState({ ...ingredientsMock[1], id: 'bun' })
    );

    expect(stateWithBun).toEqual({
      constructorItems: {
        bun: {
          ...ingredientsMock[1],
          id: 'bun'
        },
        ingredients: [
          {
            ...ingredientsMock[0],
            id: 'ingr'
          }
        ]
      }
    });
  });
});