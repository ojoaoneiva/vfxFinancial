import { CurrencyProvider } from './src/contexts/CurrencyContext';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <CurrencyProvider>
      <MainScreen />
    </CurrencyProvider>
  );
};

export default App;