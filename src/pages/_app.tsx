import { ChakraProvider } from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useTheme();

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
