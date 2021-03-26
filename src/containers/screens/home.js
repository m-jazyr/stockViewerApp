import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getSymbols } from '../../api/searchSymbol';
import { colors } from '../../assets/colors';
import { logout } from '../../redux/authSlice';
import { removeValue } from '../../utils/asyncStorage';
import { USER_KEY } from '../../utils/constants';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    await removeValue(USER_KEY);
    dispatch(logout());
  };
  
  return (
    <View style={styles.container}>
      <Button title={'Chart'} onPress={() => navigation.navigate('Chart')} />
      <Button title={'Log out'} onPress={onLogout} />
      <Button title={'Search'} onPress={() => navigation.navigate('Search')} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
