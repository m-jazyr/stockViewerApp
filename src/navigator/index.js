import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Biometric from '../containers/screens/biometric';
import Login from '../containers/screens/login';
import { authSelector, login } from '../redux/authSlice';
import { getStoredValue } from '../utils/asyncStorage';
import { USER_KEY } from '../utils/constants';
import MainNavigator from './mainNavigator';

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

  return (
    <NavigationContainer>
      {userToken ? unlocked ? <MainNavigator /> : <Biometric /> : <Login />}
    </NavigationContainer>
  );
};

export default Navigator;
