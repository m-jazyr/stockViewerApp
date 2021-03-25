import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { getFinancialItem } from '../../api/stockData';
import { ALPHAVANTAGE_TYPES } from '../../utils/constants';

const ChartPage = () => {
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
        <WebView
          source={source}
          javaScriptEnabled
          startInLoadingState={true}
          ref={webviewRef}
          onMessage={onMessage}
          originWhitelist={['*']}
          onLoad={() =>
            webviewRef.current.postMessage(JSON.stringify(chartData))
          }
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChartPage;
