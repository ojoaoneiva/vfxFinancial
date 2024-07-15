import axios from 'axios';
import { API_KEY } from '@env';

const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (functionType, fromCurrency, toCurrency) => {
  try {
    const APIKEY = API_KEY;
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        function: functionType,
        from_symbol: fromCurrency,
        to_symbol: toCurrency,
        apikey: APIKEY,
        outputsize: 'compact'
      },
    });

    return response.data['Time Series FX (Daily)'];
  }
  catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};