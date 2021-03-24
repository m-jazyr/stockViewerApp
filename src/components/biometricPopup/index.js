import React, { useEffect } from 'react';
import LocalAuthentication from 'rn-local-authentication';
import { strings } from '../../assets/strings';

const BiometricPopup = ({ onAuthenticate, handlePopupDismissed, type }) => {
  const showPopUp = () => {
    LocalAuthentication.authenticateAsync({
      reason: strings.loginDesc.replace('$type', type),
      fallbackEnabled: true,
      fallbackToPinCodeAction: true,
      cancelTitle: strings.cancel,
      title: strings.unlockApp,
    })
      .then((response) => {
        if (response.success) {
          onAuthenticate();
        } else {
          handlePopupDismissed();
          console.log(response.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    showPopUp();
  }, []);

  return false;
};

export default BiometricPopup;
