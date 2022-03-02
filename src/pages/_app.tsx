import { Box, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/pt-sans/400.css";
import "@fontsource/pt-sans/700.css";
import type { AppProps } from "next/app";
import { PropsWithChildren } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <Root>
        <Component {...pageProps} />
      </Root>
    </ChakraProvider>
  );
};

const Root = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      minHeight="100vh"
      fontFamily="'PT Sans', sans-serif"
      color="gray.700"
      backgroundColor="gray.50"
      scrollBehavior="smooth"
    >
      {children}
    </Box>
  );
};

export default App;
