import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, Container } from "@chakra-ui/react";
import PageLoader from "components/PageLoader";
import apolloClient from "config/apollo/client";
import theme from "config/theme";
import type { AppProps } from "next/app";
import Head from "next/head";

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

          <Container p={0} maxW="container.md">
            <Component {...pageProps} />
          </Container>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
