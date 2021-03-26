import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import WebView from 'react-native-webview';
import { getFinancialItem } from '../../api/stockData';
import { ALPHAVANTAGE_TYPES } from '../../utils/constants';
import { colors } from '../../assets/colors';
import { aapl } from './aapl';
import { images } from '../../assets/images';

const ChartPage = ({ navigation }) => {
  const webviewRef = React.useRef(null);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartdata] = useState([]);

  const fetchData = () => {
    getFinancialItem('IBM', ALPHAVANTAGE_TYPES.MONTHLY).then((result) => {
      stockData = result;
      setChartdata(result);
      setShowChart(true);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const runFirst = `
    document.body.style.backgroundColor = 'green';
      true; // note: this is required, or you'll sometimes get silent failures
    `;

  function onMessage(datas) {
    console.log(datas);
  }
  let source =
    Platform.OS === 'ios'
      ? require('./stockChart.html')
      : { uri: 'file:///android_asset/stockChart.html' };

  return (
    <SafeAreaView style={styles.container}>
      {showChart ? (
        <>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack()}>
            <Image
              source={images.back}
              style={styles.backArrowImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <WebView
            source={source}
            javaScriptEnabled
            startInLoadingState={true}
            ref={webviewRef}
            onMessage={onMessage}
            scrollEnabled={false}
            originWhitelist={['*']}
            onLoad={() => webviewRef.current.postMessage(JSON.stringify(chartData))}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    backgroundColor: colors.white,
  },
  backArrow: {
    position: 'absolute',
    zIndex: 10,
    top: Platform.OS == 'ios' ? 16 : 40,
    left: 16,
    height: 30,
    width: 30,
    backgroundColor: colors.transparent,
    borderRadius: 15,
    elevation: 10,
  },
  backArrowImage: {
    height: 30,
    width: 30,
  },
});

export default ChartPage;
