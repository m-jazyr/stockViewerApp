import moment from 'moment';
import {
  ALPHAVANTAGE_API_KEY,
  ALPHAVANTAGE_BASE_URL,
  ALPHAVANTAGE_TYPES,
} from '../utils/constants';

export const getSymbols = async (word) => {
  let url = `${ALPHAVANTAGE_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${word}&apikey=${ALPHAVANTAGE_API_KEY}`;


  const response = await fetch(url);
  const data = await response.json();
  const matches = data["bestMatches"]
// let array = []
//   matches.forEach(element => {
//     array.push
//     console.log(element);
//   });
  return matches;
};

const res = {
  "bestMatches": [
      {
          "1. symbol": "TESO",
          "2. name": "Tesco Corporation USA",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-04",
          "8. currency": "USD",
          "9. matchScore": "0.8889"
      },
      {
          "1. symbol": "TSCO.LON",
          "2. name": "Tesco PLC",
          "3. type": "Equity",
          "4. region": "United Kingdom",
          "5. marketOpen": "08:00",
          "6. marketClose": "16:30",
          "7. timezone": "UTC+01",
          "8. currency": "GBP",
          "9. matchScore": "0.7273"
      },
      {
          "1. symbol": "TSCDF",
          "2. name": "Tesco plc",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-04",
          "8. currency": "USD",
          "9. matchScore": "0.7143"
      },
      {
          "1. symbol": "TSCDY",
          "2. name": "Tesco plc",
          "3. type": "Equity",
          "4. region": "United States",
          "5. marketOpen": "09:30",
          "6. marketClose": "16:00",
          "7. timezone": "UTC-04",
          "8. currency": "USD",
          "9. matchScore": "0.7143"
      },
      {
          "1. symbol": "TCO.DEX",
          "2. name": "Tesco PLC",
          "3. type": "Equity",
          "4. region": "XETRA",
          "5. marketOpen": "08:00",
          "6. marketClose": "20:00",
          "7. timezone": "UTC+02",
          "8. currency": "EUR",
          "9. matchScore": "0.7143"
      },
      {
          "1. symbol": "TCO.FRK",
          "2. name": "Tesco PLC",
          "3. type": "Equity",
          "4. region": "Frankfurt",
          "5. marketOpen": "08:00",
          "6. marketClose": "20:00",
          "7. timezone": "UTC+02",
          "8. currency": "EUR",
          "9. matchScore": "0.7143"
      }
  ]
}