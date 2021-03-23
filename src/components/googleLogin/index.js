import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import { colors } from '../../assets/colors';
import { images } from '../../assets/images';
import { strings } from '../../assets/strings';

const GoogleLogin = ({ onSuccess, onFailure }) => {
  const googleConfig = () => {
    GoogleSignin.configure({
      webClientId:
        '411269001824-i8usujop4d24ahaj4boaln5r1o3pct85.apps.googleusercontent.com',
      offlineAccess: true,
    });
  };

  const signIn = async () => {
    googleConfig();
    await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onSuccess(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        onFailure(strings.playServiceError);
      } else {
        onFailure(strings.error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => signIn()} style={styles.loginButton}>
        <Image
          source={images.google}
          resizeMode={'contain'}
          style={styles.googleIcon}
        />
        <Text style={styles.loginText}>{strings.googleSignIn}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    flexDirection: 'row',
    width: '85%',
    borderRadius: 30,
    height: 60,
    backgroundColor: colors.buttonBg,
    alignItems: 'center',
    paddingHorizontal: 40,
    shadowColor: colors.black,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 15,
  },
  googleIcon: {
    height: 32,
    width: 32,
  },
  loginText: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 16,
    color: colors.white,
  },
});

export default GoogleLogin;
