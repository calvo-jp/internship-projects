import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Heading,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Pokedex - SSG & SSR Demo using NextJS</title>
      </Head>

      <VStack
        spacing={{ base: 6, md: 10 }}
        minH="100vh"
        align="center"
        justify="center"
      >
        <Brand />

        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={{ base: 2, md: 4 }}
        >
          <Link
            href="/ssg/pokemons"
            label="SSG"
            helperText="Static Site Generation"
          />

          <Link
            href="/ssr/pokemons"
            label="SSR"
            helperText="Server Side Rendering"
          />
        </Stack>

        <Credits />
      </VStack>

      <GithubLink />
    </>
  );
}

const GithubLink = () => {
  return (
    <ChakraLink
      href="https://github.com/calvo-jp/pokedex-chakra"
      isExternal
      position="absolute"
      right={2}
      bottom={2}
      p={2}
      color="gray.600"
      _hover={{ color: "gray.700" }}
    >
      <HStack>
        <Text fontSize="sm">Source Code</Text>
        <ArrowForwardIcon />
      </HStack>
    </ChakraLink>
  );
};

interface LinkProps {
  href: string;
  label: string;
  helperText: string;
}

const Link = ({ href, label, helperText }: LinkProps) => {
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

const Brand = () => {
  return (
    <Box>
      <Heading
        as="h1"
        w="fit-content"
        mx="auto"
        fontSize={56}
        fontWeight={700}
        lineHeight={1}
        backgroundClip="text"
        fill="transparent"
        bgGradient="linear(to right, orange.400, yellow.500)"
      >
        POKEDEX
      </Heading>

      <Text as="p" textAlign="center" fontSize="sm" color="gray.500">
        Next SSG and SSR Demo
      </Text>
    </Box>
  );
};

const Credits = () => {
  return (
    <Center color="gray.500">
      <HStack>
        <Text align="center">⚡ Powered by</Text>

        <ChakraLink
          href="https://pokeapi.co/"
          isExternal
          fontWeight="bold"
          _hover={{ color: "orange.400" }}
        >
          pokeapi
        </ChakraLink>
      </HStack>
    </Center>
  );
};
