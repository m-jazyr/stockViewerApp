import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assets/colors';
import GoogleLogin from '../../components/googleLogin';
import { login } from '../../redux/authSlice';
import { storeValue } from '../../utils/asyncStorage';
import { USER_KEY } from '../../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const onLoginSuccess = async (userInfo) => {
    await storeValue(USER_KEY, userInfo.user.id);
    dispatch(login(userInfo.user.id));
  };
  return (
    <View style={styles.container}>
      <GoogleLogin
        onSuccess={(userInfo) => onLoginSuccess(userInfo)}
        onFailure={(message) => console.log(message)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});

export default Login;
