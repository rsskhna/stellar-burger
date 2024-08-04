import { authChecked, getUser, loginUser, registerUser, updateUser, userLogout, userReducer } from './userSlice';
import { expect } from '@jest/globals';
import { TUser } from '@utils-types';

describe('userReducer actions tests', () => {
  const initialState = {
    isAuthChecked: false,
    isAuthenticated: false,
    data: null,
    error: null,
    loading: false
  };

  const userData = {
    email: 'i.rossokhina@yandex.ru',
    name: 'rsskhna'
  };

  const regData = {
    ...userData,
    password: 'password'
  };

  const authResponse = {
    success: true,
    refreshToken: 'refresh',
    accessToken: 'access',
    user: userData
  };

  it('auth check test', () => {
    const newState = userReducer(initialState, authChecked());

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  it('user logout test', () => {
    const newState = userReducer(initialState, userLogout());

    expect(newState).toEqual({
      ...initialState,
      data: null
    });
  });

  it('login user fulfilled', () => {
    const actualState = userReducer(
      { ...initialState, loading: true },
      loginUser.fulfilled(userData, '', regData)
    );

    expect(actualState).toEqual({
      isAuthChecked: true,
      isAuthenticated: true,
      data: userData,
      error: null,
      loading: false
    });
  });

  it('login user pending', () => {
    const testError = new Error('error');

    const actualState = userReducer(
      { ...initialState, error: testError.message },
      loginUser.pending('', regData)
    );

    expect(actualState).toEqual({
      ...initialState,
      error: null,
      loading: true
    });
  });

  it('login user rejected', () => {
    const testError = new Error('error');

    const actualState = userReducer(
      { ...initialState, error: testError.message, loading: true },
      loginUser.rejected(testError, '', regData)
    );

    expect(actualState).toEqual({
      ...initialState,
      error: testError.message,
      loading: false,
      isAuthChecked: true
    });
  });

  it('register user fulfilled', () => {
    const actualState = userReducer(
      { ...initialState, loading: true },
      registerUser.fulfilled(userData, '', regData)
    );

    expect(actualState).toEqual({
      isAuthChecked: true,
      isAuthenticated: true,
      data: userData,
      error: null,
      loading: false
    });
  });

  it('update user fulfilled', () => {
    const actualState = userReducer(
      { ...initialState },
      updateUser.fulfilled(
        { user: { ...userData }, success: true },
        '',
        regData
      )
    );

    expect(actualState).toEqual({
      ...initialState,
      data: userData
    });
  });

  it('get user fulfilled', () => {
    const actualState = userReducer(
      { ...initialState },
      getUser.fulfilled({ user: { ...userData }, success: true }, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      data: userData
    });
  });
});
