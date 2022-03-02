import { Box, Link, Stack, Text } from "@chakra-ui/react";
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
            <Link>
              <Text fontSize="3xl" lineHeight={1}>
                SSR
              </Text>
              <Text fontSize="sm">Server Side Rendering</Text>
            </Link>
          </NextLink>

          <NextLink passHref href="/ssg/pokemons">
            <Link>
              <Text fontSize="3xl" lineHeight={1}>
                SSR
              </Text>
              <Text fontSize="sm">Server Side Generation</Text>
            </Link>
          </NextLink>
        </Stack>
      </Box>
    </>
  );
}
