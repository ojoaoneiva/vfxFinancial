import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import usdFlag from '../../assets/usd.png';
import eurFlag from '../../assets/eur.png';
import gbpFlag from '../../assets/gbp.png';
import { CurrencyContext } from '../contexts/CurrencyContext';

const CurrencyPicker = ({ label }) => {
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } = useContext(CurrencyContext);
  const [isOpen, setIsOpen] = useState(false);

  const selectedCurrency = label === 'From' ? fromCurrency : toCurrency;
  const onChangeCurrency = label === 'From' ? setFromCurrency : setToCurrency;

  const handleSelectCurrency = (currency) => {
    onChangeCurrency(currency);
    setIsOpen(false);
  };

  const renderItem = (item, isSelected) => (
    <View style={[styles.dropdownItem, isSelected && styles.selectedItem]}>
      <Image source={getFlagImage(item.value)} style={styles.flagIcon} />
      <Text style={styles.dropdownText}>{item.label}</Text>
    </View>
  );

  const getFlagImage = (currencyCode) => {
    switch (currencyCode) {
      case 'USD':
        return usdFlag;
      case 'EUR':
        return eurFlag;
      case 'GBP':
        return gbpFlag;
      default:
        return null;
    }
  };

  const renderLeftIcon = () => (
    <Image source={getFlagImage(selectedCurrency)} style={styles.flagIcon} />
  );

  return (
    <View style={styles.pickerContainer}>
      <Dropdown
        style={styles.dropdown}
        iconStyle={styles.iconStyle}
        data={[
          { label: 'USD', value: 'USD' },
          { label: 'EUR', value: 'EUR' },
          { label: 'GBP', value: 'GBP' }
        ]}
        value={selectedCurrency}
        placeholder={!isOpen ? 'Select currency' : '...'}
        labelField="label"
        valueField="value"
        renderLeftIcon={renderLeftIcon}
        renderItem={renderItem}
        onChange={(item) => handleSelectCurrency(item.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        maxHeight={200}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginVertical: 10,
    flex: 1
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  flagIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
  },
  selectedItem: {
    backgroundColor: '#e6f7ff',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});

export default CurrencyPicker;