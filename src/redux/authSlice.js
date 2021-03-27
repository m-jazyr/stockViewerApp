import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userToken: null,
    unlocked: false,
    loading: false,
    errorMessage: '',
  },
  reducers: {
    login: (state, { payload }) => {
      state.userToken = payload;
    },
    unlock: (state) => {
      state.unlocked = true;
    },
    logout: (state) => {
      state.unlocked = false;
      state.userToken = null;
    },
  },
});

export const authSelector = (state) => state.auth;
const { actions, reducer } = authSlice;
export const { logout, login, unlock } = actions;
export default reducer;
