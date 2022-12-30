import Layout from './components/Layout';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme';

function App() {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.green },
    },
    theme
  );

  return (
    <ChakraProvider theme={myTheme}>
      <Layout />
    </ChakraProvider>
  );
}

export default App;
