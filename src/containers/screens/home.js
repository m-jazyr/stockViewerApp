import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
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
      <Text style={styles.logout} onPress={onLogout}>
        Log out
      </Text>
      <Button
        icon={<Icon name="search" size={24} color="white" />}
        containerStyle={styles.btnContainer}
        title={' Search Symbols'}
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    position: 'absolute',
    bottom: 32,
    right: 16,
    fontSize: 18,
  },
  btnContainer: { width: '90%' },
});

export default Home;
