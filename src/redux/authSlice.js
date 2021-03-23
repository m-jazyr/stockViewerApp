import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userToken: null,
    loading: false,
    errorMessage: '',
  },
  reducers: {
    login: (state, { payload }) => {
      state.userToken = payload;
    },
    logout: (state) => {
      state.userToken = null;
    },
  },
});

export const authSelector = (state) => state.auth;
const { actions, reducer } = authSlice;
export const { logout, login } = actions;
export default reducer;
