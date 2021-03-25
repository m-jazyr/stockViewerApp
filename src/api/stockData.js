import moment from 'moment';
import {
  ALPHAVANTAGE_API_KEY,
  ALPHAVANTAGE_BASE_URL,
  ALPHAVANTAGE_TYPES,
} from '../utils/constants';

export const getFinancialItem = async (symbol, type) => {
  //   let url = `${ALPHAVANTAGE_BASE_URL}/query?function=${type}&interval=15min&symbol=${symbol}&outputsize=full&apikey=${ALPHAVANTAGE_API_KEY}`;
  let url = `${ALPHAVANTAGE_BASE_URL}/query?function=${type}&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}&outputsize=compact&interval=1min`;

  const createTickerChart = (data) => {
    var tickerData = [];
    Object.entries(data).forEach(([key, val]) => {
      let date = toDate(key);
      tickerData.push([
        date,
        +val['1. open'],
        +val['2. high'],
        +val['3. low'],
        +val['4. close'],
      ]);
    });
    return tickerData;
  };

  const toDate = (dateStr) => {
    // var proper = moment(dateStr).format('YYYY-MM-DD  hh:mm:ss')
    const format =
      type == ALPHAVANTAGE_TYPES.INTRADAY
        ? 'YYYY-MM-DD  hh:mm:ss'
        : 'YYYY-MM-DD';
    const someDate = moment(dateStr, format).valueOf();
    console.log(dateStr,someDate);
    return someDate;
  };

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
    // const stockData = createTickerChart(data["Time Series (1min)"])
  //   const stockData = createTickerChart(data["Time Series (Daily)"])
    const stockData = createTickerChart(data["Monthly Time Series"])
  //   Weekly Time Series
  // Monthly Time Series
  return stockData;
};
