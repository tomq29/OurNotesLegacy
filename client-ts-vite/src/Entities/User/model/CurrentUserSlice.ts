import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../type/UserType';
import AuthApi from '../api/AuthApi';
import { logEmailPassType, loginPassType } from '../type/AuthTypes';

export type userSliceType = {
  user: User | undefined;
  accessToken: string;
};

const initialState: userSliceType = {
  user: undefined,
  accessToken: '',
};

export const loginUser = createAsyncThunk(
  'user/login',
  (loginPass: loginPassType) => AuthApi.login(loginPass)
);

export const regUser = createAsyncThunk(
  'user/reg',
  (logEmailPass: logEmailPassType) => AuthApi.reg(logEmailPass)
);

export const logoutUser = createAsyncThunk('user/logout', () =>
  AuthApi.logout()
);

export const refreshUser = createAsyncThunk('user/refresh', () =>
  AuthApi.refreshToken()
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => action.payload);
  },
});

export default currentUserSlice.reducer;
