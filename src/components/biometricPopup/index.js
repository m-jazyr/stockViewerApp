import React, { useEffect } from 'react';
import LocalAuthentication from 'rn-local-authentication';

const BiometricPopup = ({ onAuthenticate, handlePopupDismissed }) => {
  const showPopUp = () => {
    LocalAuthentication.authenticateAsync({
      reason: 'string',
      fallbackEnabled: true,
      fallbackTitle: 'Use Pattern',
      fallbackToPinCodeAction: true,
      cancelTitle: 'Cancel',
      title: 'Use Biometrics',
    })
      .then((response) => {
        if (response.success) {
          onAuthenticate();
          console.log('Authorized successfully!');
        } else {
          handlePopupDismissed();
          console.log(`Something went wrong. Error: ${response.error}`);
        }
      })
      .catch((err) => console.log(JSON.stringify(err)));
  };

  useEffect(() => {
    showPopUp();
  }, []);

  return false;
};

export default BiometricPopup;
