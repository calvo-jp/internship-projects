import { ApolloProvider } from "@apollo/client";
import { Box, ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import apolloClient from "config/apollo/client";
import theme from "config/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PropsWithChildren } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <Root>
            <Component {...pageProps} />
          </Root>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

const Root = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box bgColor="brand.gray.900" minH="100vh" color="white">
      {children}
    </Box>
  );
};

export default App;
