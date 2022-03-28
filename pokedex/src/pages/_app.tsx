import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import Lightbox from "components/lightbox";
import PageLoader from "components/PageLoader";
import apolloClient from "config/apollo/client";
import "config/polyfill";
import theme from "config/theme";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Internship project using NextJs, Next Auth, GraphQL Apollo client and Chakra UI. Powered by pokeapi"
        />
        <meta
          name="keywords"
          content={[
            "nextjs",
            "graphql",
            "apollo",
            "chakra",
            "pokemon",
            "next-auth",
            "react",
            "pokedex",
          ].join()}
        />
      </Head>

      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={apolloClient}>
          <ChakraProvider theme={theme}>
            <PageLoader />
            <Component {...pageProps} />
            <Lightbox />
          </ChakraProvider>
        </ApolloProvider>
      </SessionProvider>
    </React.Fragment>
  );
};

export default App;
