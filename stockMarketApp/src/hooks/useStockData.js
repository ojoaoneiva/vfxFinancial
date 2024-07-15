import { useState, useEffect, useContext } from 'react';
import { fetchStockData } from '../services/api';
import { CurrencyContext } from '../contexts/CurrencyContext';

const useStockData = (functionType) => {
  const { fromCurrency, toCurrency } = useContext(CurrencyContext);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        setLoading(true);
        const data = await fetchStockData(functionType, fromCurrency, toCurrency);

        if (!data) {
          throw new Error('Empty data received');
        }

        const formattedData = Object.keys(data).map((date, index, array) => {
          const open = parseFloat(data[date]['1. open']);
          const close = parseFloat(data[date]['4. close']);
          const prevClose = index < array.length - 1 ? parseFloat(data[array[index + 1]]['4. close']) : close;
          const change = close - prevClose;
          const changePercent = (change / prevClose) * 100;
          return {
            date,
            open: open.toFixed(3),
            high: parseFloat(data[date]['2. high']).toFixed(3),
            low: parseFloat(data[date]['3. low']).toFixed(3),
            close: close.toFixed(3),
            changePercent: changePercent.toFixed(2),
          };
        });

        if (formattedData.length > 0) {
          setStockData(formattedData);
          setExchangeRate(parseFloat(data[formattedData[0].date]['4. close']).toFixed(3));
          setError(null);
        } else {
          throw new Error('No valid stock data found');
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadStockData();
  }, [functionType, fromCurrency, toCurrency]);

  return { stockData, loading, exchangeRate, error };
};

export default useStockData;