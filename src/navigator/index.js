import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Biometric from '../containers/screens/biometric';
import Home from '../containers/screens/home';
import Login from '../containers/screens/login';
import { authSelector, login } from '../redux/authSlice';
import { getStoredValue } from '../utils/asyncStorage';
import { USER_KEY } from '../utils/constants';

const Navigator = () => {
  const { userToken, unlocked } = useSelector(authSelector);
  const dispatch = useDispatch();

  const fetchToken = async () => {
    const token = await getStoredValue(USER_KEY);
    token ? dispatch(login(token)) : null;
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return userToken ? unlocked ? <Home /> : <Biometric /> : <Login />;
};

export default Navigator;
