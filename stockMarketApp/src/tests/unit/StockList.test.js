import React from 'react';
import { render } from '@testing-library/react-native';
import StockList from '../../components/StockList';

describe('<StockList />', () => {
  it('renders stock items correctly', () => {
    const stockData = [
      { date: '2024-07-15', changePercent: 1.5, high: '100', low: '90', open: '95', close: '98' },
      { date: '2024-07-14', changePercent: -0.5, high: '102', low: '92', open: '98', close: '97' },
    ];

    const { getAllByTestId } = render(<StockList stockData={stockData} />);

    // Check if correct number of items are rendered
    expect(getAllByTestId(/^stock-list-item-/)).toHaveLength(stockData.length);
  });
  
});