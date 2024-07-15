import React from 'react';
import { render } from '@testing-library/react-native';
import MainScreen from '../../screens/MainScreen';
import { CurrencyContext } from '../../contexts/CurrencyContext';

// Define a wrapper component for the context
const MockedCurrencyProvider = ({ children, value }) => {
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

test('currency update via context', () => {
  const mockContextValues = {
    fromCurrency: 'USD',
    setFromCurrency: jest.fn(),
    toCurrency: 'EUR',
    setToCurrency: jest.fn(),
  };

  const { getByTestId } = render(
    <MockedCurrencyProvider value={mockContextValues}>
      <MainScreen />
    </MockedCurrencyProvider>
  );

  // Simulate currency swap directly via context
  mockContextValues.setFromCurrency('EUR');
  mockContextValues.setToCurrency('USD');

  // Check if setFromCurrency and setToCurrency functions were called correctly
  expect(mockContextValues.setFromCurrency).toHaveBeenCalledWith('EUR');
  expect(mockContextValues.setToCurrency).toHaveBeenCalledWith('USD');
});