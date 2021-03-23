import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';

const reducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer: reducer,
});

export default store;
