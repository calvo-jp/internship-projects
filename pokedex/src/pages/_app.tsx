import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/public-sans/400.css";
import Lightbox from "components/lightbox";
import PageLoader from "components/PageLoader";
import apolloClient from "config/apollo/client";
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
          key="app:description"
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
