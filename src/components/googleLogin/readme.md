# Google login

### _Configuration_

- Download the Firebase configuration file for both iOS and android and update it in the project.
  [android](https://github.com/react-native-google-signin/google-signin/blob/master/docs/get-config-file.md) guide
  [iOS](https://github.com/react-native-google-signin/google-signin/blob/master/docs/get-config-file.md) guide
- Update **GOOGLE_WEB_CLIENT_ID** in the env file with value client_id of client_type 3 from google-services.json
- in iOS, Configure URL types in the Info panel in xcode, add a URL with scheme set to your REVERSED_CLIENT_ID (found inside GoogleService-Info.plist)

### _Sample usage_

```sh
import GoogleLogin from '../../../components/googleLogin';
```

```sh
<GoogleLogin
    useDefaultButton={false}
    onSuccess={(userInfo) => console.log(userInfo)}
    onFailure={(message) => console.log(message)}
/>
```

### _To remove this feature_

- Remove "react-native-google-signin" from package.json
- Perform an npm install
- Update podfiles by using "pod install" in ios folder
- Remove this component folder
