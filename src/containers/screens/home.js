import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title={'Log out'} onPress={() => dispatch(logout())} />
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
