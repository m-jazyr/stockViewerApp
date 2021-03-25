import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
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
