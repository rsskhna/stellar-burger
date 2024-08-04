import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '../../../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    userLogout();
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    });
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ email, name, password }: TRegisterData) =>
    await updateUserApi({ email, name, password })
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser | null;
  error: null | string;
  loading: boolean;
};

const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  error: null,
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUserData: (state) => state.data,
    selectUserName: (state) => (state.data ? state.data.name : '')
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      });
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const userReducer = userSlice.reducer;
export const { authChecked, userLogout } = userSlice.actions;
export const {
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectUserData,
  selectUserName
} = userSlice.selectors;
