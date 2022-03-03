import { Box, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

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
        <Stack spacing={10}>
          <Header />

          <Stack direction="row" spacing={4} as="main">
            <CustomLink
              href="/ssg/pokemons"
              label="SSG"
              helperText="Static Site Generation"
            />

            <CustomLink
              href="/ssr/pokemons"
              label="SSR"
              helperText="Server Side Rendering"
            />
          </Stack>

          <Footer />
        </Stack>
      </Box>
    </>
  );
}

interface CustomLinkProps {
  href: string;
  label: string;
  helperText: string;
}

const CustomLink = ({ href, label, helperText }: CustomLinkProps) => {
  return (
    <NextLink passHref href={href}>
      <Box
        as="a"
        textAlign="center"
        border={1}
        borderStyle="solid"
        borderColor="gray.300"
        py={2}
        px={4}
        rounded="sm"
        _hover={{
          borderColor: "orange.300",
        }}
      >
        <Text fontSize="5xl" lineHeight={1}>
          {label}
        </Text>

        <Text fontSize="sm" color="gray.600">
          {helperText}
        </Text>
      </Box>
    </NextLink>
  );
};

const Header = () => {
  return (
    <Box as="header">
      <Text
        as="h1"
        w="fit-content"
        mx="auto"
        fontSize={64}
        fontWeight={700}
        lineHeight={1}
        backgroundClip="text"
        fill="transparent"
        bgGradient="linear(to right, orange.400, yellow.500)"
      >
        POKEDEX
      </Text>

      <Text as="p" textAlign="center" fontSize="sm" color="gray.500">
        Next SSG and SSR Demo
      </Text>
    </Box>
  );
};

const Footer = () => {
  return (
    <Box as="footer">
      <Text align="center" color="gray.500">
        ⚡ Powered by{" "}
        <Box
          as="a"
          href="https://pokeapi.co/"
          rel="noreferrer"
          target="_blank"
          fontWeight="bold"
          _hover={{ color: "orange.400" }}
        >
          pokeapi
        </Box>
      </Text>
    </Box>
  );
};
