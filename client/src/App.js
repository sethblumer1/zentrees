import Layout from './components/Layout';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme';
import { GlobalProvider } from './components/context/GlobalContext';

function App() {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.green },
    },
    theme
  );

  return (
    <GlobalProvider>
      <ChakraProvider theme={myTheme}>
        <Layout />
      </ChakraProvider>
    </GlobalProvider>
  );
}

export default App;
