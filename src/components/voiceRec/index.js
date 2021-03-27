import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import { Button, colors } from 'react-native-elements';
export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: false,
      results: [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechStart(e) {
    this.setState({
      started: true,
    });
  }

  onSpeechEnd(e) {
    this.setState({
      started: false,
    });
  }
  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  }
  onSpeechResults(e) {
    this.setState({ started: false });
    const item = e.value[0];
    if (item.includes('show ')) {
      const test = item.replace('show ', '');
      this.props.navigation.navigate('Search', {
        stock: test,
      });
    } else if (item.includes('current price of ')) {
      const test = item.replace('current price of ', '');
      this.props.navigation.navigate('Search', {
        stock: test,
      });
    } else {
    }
    this.setState({
      results: e.value,
    });
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'App Mic Permission',
          message: 'App needs access to your mic ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the mic');
        return true;
      } else {
        console.log('Mic permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };
  async _startRecognition(e) {
    if (Platform.OS === 'android' && !this.requestCameraPermission()) {
      return;
    }
    this.setState({
      recognized: '',
      results: [],
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          containerStyle={styles.btnContainer}
          style={styles.transcript}
          onPress={this._startRecognition.bind(this)}
          title="Use Voice Search"
        />
        {this.state.started && (
          <ActivityIndicator color={colors.primary} size={'large'} animating />
        )}
        <Text>eg: </Text>
        <Text>{'Show “Stock Name" \nCurrent Price of “Stock Name"'}</Text>
        {this.state.results.map((result, index) => (
          <Text style={styles.transcript}> {result}</Text>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', marginVertical: 12 },
  btnContainer: { width: '90%' },
  transcript: { color: colors.primary, fontSize: 12 },
});
