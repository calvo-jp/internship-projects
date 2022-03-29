import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import Lightbox from "components/lightbox";
import PageLoader from "components/PageLoader";
import apolloClient from "config/apollo/client";
import "config/polyfill"; /* polyfill to string|array.at() method for vercel */
import theme from "config/theme";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
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

      <Script
        strategy="lazyOnload"
        src={"https://www.googletagmanager.com/gtag/js?id=" + googleAnalyticsId}
      />

      <Script id="" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${googleAnalyticsId});`}
      </Script>

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

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

export default App;
