import { Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Landing() {
  return (
    <Box>
      <NextLink passHref href="/ssr/pokemons">
        <Link>SSR</Link>
      </NextLink>

      <NextLink passHref href="/ssg/pokemons">
        <Link>SSG</Link>
      </NextLink>
    </Box>
  );
}
