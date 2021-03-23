import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { colors } from '../../assets/colors';
import GoogleLogin from '../../components/googleLogin';
import { login } from '../../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <GoogleLogin
        onSuccess={(userInfo) => dispatch(login(userInfo.user.id))}
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
