import React from 'react';
import Home from '../containers/screens/home';
import Login from '../containers/screens/login';

const Navigator = () => {
  const isLoggedIn = true;

  return isLoggedIn ? <Home /> : <Login />;
};

export default Navigator;
