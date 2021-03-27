import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import LocalAuthentication from 'rn-local-authentication';
import { colors } from '../../assets/colors';
import { images } from '../../assets/images';
import { strings } from '../../assets/strings';
import BiometricPopup from '../../components/biometricPopup';
import PrimaryButton from '../../components/primaryButton';
import { logout, unlock } from '../../redux/authSlice';
import { removeValue } from '../../utils/asyncStorage';
import { USER_KEY } from '../../utils/constants';

const Biometric = () => {
  const [type, changeType] = useState({
    title: 'Password/PIN',
    icon: images.user,
  });
  const [showContinue, setShowContinue] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const closePopup = () => {
    setShowContinue(true);
    setShowPopup(false);
  };

  const unlockDevice = () => {
    dispatch(unlock());
  };

  const goBack = async () => {
    await removeValue(USER_KEY);
    dispatch(logout());
  };

  const checkBiometrics = async () => {
    const support = await LocalAuthentication.isSupportedAsync();
    const available = await LocalAuthentication.isAvailableAsync();
    if (!support || !available) {
      return;
    }
    if (LocalAuthentication.getBiometryType() === 'FaceID') {
      const bType = {
        title: strings.faceID,
        icon: images.faceId,
      };
      changeType(bType);
    } else if (LocalAuthentication.getBiometryType() === 'TouchID') {
      const bType = {
        title: strings.touchID,
        icon: images.touchId,
      };
      changeType(bType);
    } else {
      const bType = {
        title: strings.deviceLock,
        icon: images.user,
      };
      changeType(bType);
    }
  };

  useEffect(() => {
    checkBiometrics();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topPart}>
        {!showContinue ? (
          <>
            <Image
              source={type.icon}
              style={styles.faceId}
              resizeMode={'contain'}
            />
            <View style={styles.descContainer}>
              <Text style={styles.descTitle1}>
                {strings.loginWith.replace('$type', type.title)}
              </Text>
              <Text style={styles.descTitle2}>
                {strings.loginDesc.replace('$type', type.title)}
              </Text>
            </View>
          </>
        ) : (
          <Image
            source={images.success}
            style={styles.faceId}
            resizeMode={'contain'}
          />
        )}
      </View>
      <View>
        {showPopup && (
          <BiometricPopup
            type={type.title}
            onAuthenticate={() => closePopup()}
            handlePopupDismissed={() => setShowPopup(false)}
          />
        )}
        {showContinue ? (
          <PrimaryButton title={strings.continue} action={unlockDevice} />
        ) : (
          <>
            <PrimaryButton
              title={`Use ${type.title}`}
              action={() => setShowPopup(true)}
            />
            <PrimaryButton title={strings.notNow} action={goBack} isNegative />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  topPart: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  faceId: {
    height: 120,
    width: 120,
    alignSelf: 'center',
  },
  descContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  descTitle1: {
    fontSize: 16,
    color: colors.grey1,
  },
  descTitle2: {
    fontSize: 12,
    color: colors.grey1,
  },
});

export default Biometric;
