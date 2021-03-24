import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { removeValue } from '../../utils/asyncStorage';
import { USER_KEY } from '../../utils/constants';

const Home = () => {
  const dispatch = useDispatch();
  const onLogout = async () => {
    await removeValue(USER_KEY);
    dispatch(logout());
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title={'Log out'} onPress={onLogout} />
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
