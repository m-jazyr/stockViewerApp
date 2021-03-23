import React from 'react';
import { useSelector } from 'react-redux';
import Home from '../containers/screens/home';
import Login from '../containers/screens/login';
import { authSelector } from '../redux/authSlice';

const Navigator = () => {
  const { userToken } = useSelector(authSelector);

  return userToken ? <Home /> : <Login />;
};

export default Navigator;
