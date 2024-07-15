import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CurrencyPicker from '../components/CurrencyPicker';
import StockList from '../components/StockList';
import useStockData from '../hooks/useStockData';
import switchIcon from '../../assets/switch';
import { SvgXml } from 'react-native-svg';
import { CurrencyContext } from '../contexts/CurrencyContext';

const MainScreen = ({ functionType = 'FX_DAILY' }) => {
  const { fromCurrency, setFromCurrency, toCurrency, setToCurrency } = useContext(CurrencyContext);

  const { stockData, loading, exchangeRate } = useStockData(functionType);

  const switchCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Market App</Text>

      <View style={styles.header}>
        <CurrencyPicker label="From" testID="fromCurrencyPicker" />
        <TouchableOpacity onPress={switchCurrencies} testID="switchButton">
          <SvgXml xml={switchIcon} style={styles.switch} />
        </TouchableOpacity>
        <CurrencyPicker label="To" testID="toCurrencyPicker" />
      </View>

      {exchangeRate && (
        <View style={styles.card}>
          <Text style={styles.mediumText}>
            1 {fromCurrency} = {exchangeRate} {toCurrency} <Text style={styles.smallText}>at the daily market rate</Text>
          </Text>
        </View>
      )}

      <TouchableOpacity onPress={() => {}} style={styles.refreshButton} testID="refreshButton">
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <StockList stockData={stockData} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center'
  },
  flag: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 30
  },
  mediumText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#2d2d2d'
  },
  switch: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },
  refreshButton: {
    backgroundColor: '#19607A',
    color: 'white',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  card: {
    height: 90,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E9EEE8',
  }
});

export default MainScreen;