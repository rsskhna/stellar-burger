import { feedsReducer, getFeeds, initialState } from './feedsSlice';
import { expect, jest } from '@jest/globals';

describe('feedsReducer actions tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const feedsData = {
    orders: [
      {
        _id: '66afa079119d45001b4fd8d9',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa0945'
        ],
        status: 'done',
        name: 'Антарианский space краторный люминесцентный spicy био-марсианский бургер',
        createdAt: '2024-08-04T15:38:33.913Z',
        updatedAt: '2024-08-04T15:38:34.784Z',
        number: 48432
      }
    ],
    total: 48058,
    totalToday: 86
  };

  const feedsApiMockData = {
    ...feedsData,
    success: true
  };

  const feedsExpectedResult = {
    ...feedsData,
    error: null,
    loading: false
  };

  it('feeds fulfilled', () => {
    const actualState = feedsReducer(
      { ...feedsExpectedResult, loading: true },
      getFeeds.fulfilled(feedsApiMockData, '')
    );

    expect(actualState).toEqual({
      orders: feedsData.orders,
      total: feedsData.total,
      totalToday: feedsData.totalToday,
      loading: false,
      error: null
    });
  });

  it('feeds pending', () => {
    const testError = new Error('error');

    const actualState = feedsReducer(
      { ...initialState, error: testError.message },
      getFeeds.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('feeds rejected', () => {
    const testError = new Error('error');

    const actualState = feedsReducer(
      {
        ...initialState,
        loading: true
      },
      getFeeds.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      error: testError.message
    });
  });
});
