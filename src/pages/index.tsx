import { Box, Link, Stack } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Pokedex - SSG & SSR Demo using NextJS</title>
      </Head>

      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack>
          <NextLink passHref href="/ssr/pokemons">
            <Link fontSize="3xl">SSR</Link>
          </NextLink>

          <NextLink passHref href="/ssg/pokemons">
            <Link fontSize="3xl">SSG</Link>
          </NextLink>
        </Stack>
      </Box>
    </>
  );
}
