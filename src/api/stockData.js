import moment from 'moment';
import {
  ALPHAVANTAGE_API_KEY,
  ALPHAVANTAGE_BASE_URL,
  ALPHAVANTAGE_TYPES,
} from '../utils/constants';

export const getFinancialItem = async (symbol, type) => {
  let url = `${ALPHAVANTAGE_BASE_URL}/query?function=${type}&symbol=${symbol}&apikey=${ALPHAVANTAGE_API_KEY}&outputsize=full&interval=1min`;

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
    const format =
      type === ALPHAVANTAGE_TYPES.INTRADAY
        ? 'YYYY-MM-DD  hh:mm:ss'
        : 'YYYY-MM-DD';
    const someDate = moment(dateStr, format).valueOf();
    return someDate;
  };

  const response = await fetch(url);
  const data = await response.json();
  let responseType = '';
  switch (type) {
    case ALPHAVANTAGE_TYPES.INTRADAY:
      responseType = 'Time Series (1min)';
      break;
    case ALPHAVANTAGE_TYPES.DAILY:
      responseType = 'Time Series (Daily)';
      break;
    case ALPHAVANTAGE_TYPES.WEEKLY:
      responseType = 'Weekly Time Series';
      break;
    case ALPHAVANTAGE_TYPES.MONTHLY:
      responseType = 'Monthly Time Series';
      break;
    default:
      break;
  }
  const stockData = createTickerChart(data[responseType]);
  return stockData;
};
