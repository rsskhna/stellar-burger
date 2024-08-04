import { expect, jest } from '@jest/globals';
import { getIngredients, ingredientsReducer } from './ingredientsSlice';

describe('ingredientsReducer actions tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const ingredientsData = [
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
    }
  ];

  it('feeds fulfilled', () => {
    const actualState = ingredientsReducer(
      { ...initialState, ingredients: ingredientsData, loading: true },
      getIngredients.fulfilled(ingredientsData, '')
    );

    expect(actualState).toEqual({
      ingredients: ingredientsData,
      loading: false,
      error: null
    });
  });

  it('feeds pending', () => {
    const testError = new Error('error');

    const actualState = ingredientsReducer(
      { ...initialState, error: testError.message },
      getIngredients.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('feeds rejected', () => {
    const testError = new Error('error');

    const actualState = ingredientsReducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      error: testError.message
    });
  });
});
