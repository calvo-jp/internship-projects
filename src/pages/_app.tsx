import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import "@fontsource/pt-sans/400.css";
import "@fontsource/pt-sans/700.css";
import InternalError from "components/errors/Internal";
import PageLoader from "components/PageLoader";
import type { AppProps } from "next/app";
import Head from "next/head";
import { PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="NextJS SSG and SSR Demo" />
      </Head>

      <ChakraProvider>
        <PageLoader />

        <Root>
          <Container p={0} maxW="container.md">
            <ErrorBoundary FallbackComponent={InternalError}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Container>
        </Root>
      </ChakraProvider>
    </>
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
