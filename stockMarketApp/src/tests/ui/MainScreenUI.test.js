import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
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

test('currency swap on button click', async () => {
  const mockContextValues = {
    fromCurrency: 'USD',
    setFromCurrency: jest.fn(),
    toCurrency: 'EUR',
    setToCurrency: jest.fn(),
  };

  const { getByTestId, getByText } = render(
    <MockedCurrencyProvider value={mockContextValues}>
      <MainScreen />
    </MockedCurrencyProvider>
  );

  // Wait until 'Stock Market App' text is no longer visible
  await waitFor(() => {
    expect(getByText('Stock Market App')).toBeDefined();
  });

  // Check if currency swap button is present
  const switchButton = getByTestId('switchButton');
  expect(switchButton).toBeDefined();

  // Simulate click on currency swap button
  fireEvent.press(switchButton);

  // Wait until setFromCurrency and setToCurrency functions are called
  await waitFor(() => {
    expect(mockContextValues.setFromCurrency).toHaveBeenCalledWith('EUR');
    expect(mockContextValues.setToCurrency).toHaveBeenCalledWith('USD');
  });
});