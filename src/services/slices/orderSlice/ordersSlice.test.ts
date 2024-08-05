import { expect, jest } from '@jest/globals';
import {
  getOrderByNumber,
  getUserOrders,
  orderReducer,
  placeOrder,
  setModalData,
  setOrderRequest,
  initialState
} from './ordersSlice';

describe('ordersReducer actions tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const orderInfo = {
    success: true,
    orders: [
      {
        _id: '66afdca7119d45001b4fd9a0',
        ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
        owner: '66add8ee119d45001b4fd467',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2024-08-04T19:55:19.393Z',
        updatedAt: '2024-08-04T19:55:19.906Z',
        number: 48448,
        __v: 0
      }
    ]
  };

  const userOrders = [
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
  ];

  const modalData = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0945'
      ],
      _id: '66afcf2b119d45001b4fd978',
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-08-04T18:57:47.897Z',
      updatedAt: '2024-08-04T18:57:48.370Z',
      number: 48442
    }
  };

  it('set modal data', () => {
    const newState = orderReducer(initialState, setModalData(modalData));

    expect(newState).toEqual({
      ...initialState,
      orderModalData: modalData
    });
  });

  it('set order request status', () => {
    const newState = orderReducer(initialState, setOrderRequest(true));

    expect(newState).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  it('place order fulfilled', () => {
    const actualState = orderReducer(
      initialState,
      placeOrder.fulfilled(modalData, '', [''])
    );

    expect(actualState).toEqual({
      ...initialState,
      orderRequest: false,
      requestLoading: false,
      orderModalData: modalData.order
    });
  });

  it('place order pending', () => {
    const testError = new Error('error');

    const actualState = orderReducer(
      { ...initialState, error: testError.message },
      placeOrder.pending('', [''])
    );
    expect(actualState).toEqual({
      ...initialState,
      orderRequest: true,
      requestLoading: true,
      error: null
    });
  });

  it('place order rejected', () => {
    const testError = new Error('error');

    const actualState = orderReducer(
      {
        ...initialState,
        requestLoading: true,
        orderRequest: true
      },
      placeOrder.rejected(testError, '', [''])
    );

    expect(actualState).toEqual({
      ...initialState,
      error: testError.message
    });
  });

  it('get user orders fulfilled', () => {
    const actualState = orderReducer(
      { ...initialState, ordersLoading: true },
      getUserOrders.fulfilled(userOrders, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      orders: userOrders,
      ordersLoading: false
    });
  });

  it('get user orders pending', () => {
    const testError = new Error('error');

    const actualState = orderReducer(
      { ...initialState, error: testError.message },
      getUserOrders.pending('')
    );

    expect(actualState).toEqual({
      ...initialState,
      ordersLoading: true,
      error: null
    });
  });

  it('get user orders rejected', () => {
    const testError = new Error('error');

    const actualState = orderReducer(
      { ...initialState, ordersLoading: true, error: testError.message },
      getUserOrders.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      ordersLoading: false,
      error: testError.message
    });
  });

  it('get order by number fulfilled', () => {
    const actualState = orderReducer(
      { ...initialState, ordersLoading: true },
      getOrderByNumber.fulfilled(orderInfo, '', 0)
    );

    expect(actualState).toEqual({
      ...initialState,
      orderInfo: orderInfo.orders[0],
      ordersLoading: false
    });
  });

  it('get order by number pending', () => {
    const testError = new Error('error');

    const actualState = orderReducer(
      { ...initialState, error: testError.message },
      getOrderByNumber.pending('', 0)
    );

    expect(actualState).toEqual({
      ...initialState,
      ordersLoading: true,
      error: null
    });
  });
});
