
import { CurrencyProvider } from './src/contexts/CurrencyContext'; // Importando o CurrencyProvider
import MainScreen from './src/screens/MainScreen'; // Importando o componente HomeScreen

const App = () => {
  return (
    <CurrencyProvider>
      <MainScreen />
    </CurrencyProvider>
  );
};

export default App;
