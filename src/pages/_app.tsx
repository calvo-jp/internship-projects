import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Box bgColor="white" color="#21243D" minHeight="100vh">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default App;
