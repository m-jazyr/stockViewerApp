import {
  ALPHAVANTAGE_API_KEY,
  ALPHAVANTAGE_BASE_URL,
} from '../utils/constants';

export const getSymbols = async (word) => {
  let url = `${ALPHAVANTAGE_BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${word}&apikey=${ALPHAVANTAGE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const matches = data.bestMatches;
    return matches;
  } catch (error) {
    console.log(error);
  }
};
