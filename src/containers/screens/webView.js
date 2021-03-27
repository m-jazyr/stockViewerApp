import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import { getFinancialItem } from '../../api/stockData';
import { ALPHAVANTAGE_TYPES } from '../../utils/constants';
import { colors } from '../../assets/colors';

const ChartPage = ({ navigation, route }) => {
  const webviewRef = React.useRef(null);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartdata] = useState([]);
  const { symbol } = route.params;

  const fetchData = () => {
    getFinancialItem(symbol, ALPHAVANTAGE_TYPES.MONTHLY).then((result) => {
      setChartdata(result);
      setShowChart(true);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <WebView
          source={source}
          javaScriptEnabled
          startInLoadingState={true}
          ref={webviewRef}
          onMessage={onMessage}
          scrollEnabled={false}
          originWhitelist={['*']}
          onLoad={() => {
            const data = {
              symbol,
              chartData,
            };
            webviewRef.current.postMessage(JSON.stringify(data));
          }}
        />
      ) : (
        <ActivityIndicator animating style={styles.loader} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  loader: {
    alignSelf: 'center',
  },
});

export default ChartPage;
