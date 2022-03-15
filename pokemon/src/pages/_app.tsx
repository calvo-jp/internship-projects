import { ApolloProvider } from "@apollo/client";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import "@fontsource/pt-sans/400.css";
import "@fontsource/pt-sans/700.css";
import PageLoader from "components/PageLoader";
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
        <meta name="description" content="GraphQL + NextJS SSG and CSR Demo" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <PageLoader />

          <Root>
            <Container p={0} maxW="container.md">
              <Component {...pageProps} />
            </Container>
          </Root>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

const Root = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      minHeight="100vh"
      color="gray.700"
      bgColor="gray.50"
      scrollBehavior="smooth"
    >
      {children}
    </Box>
  );
};

export default App;
