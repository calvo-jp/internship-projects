import { Box, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/heebo/100.css";
import "@fontsource/heebo/200.css";
import "@fontsource/heebo/300.css";
import "@fontsource/heebo/400.css";
import "@fontsource/heebo/500.css";
import "@fontsource/heebo/600.css";
import "@fontsource/heebo/700.css";
import "@fontsource/heebo/800.css";
import "@fontsource/heebo/900.css";
import theme from "config/theme";
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
