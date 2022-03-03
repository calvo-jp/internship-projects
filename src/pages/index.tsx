import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import useRingtone from "hooks/useRingtone";
import Head from "next/head";
import NextLink from "next/link";

export default function Landing() {
  const ringtone = useRingtone();
  if (ringtone) ringtone.play();

  return (
    <>
      <Head>
        <title>Pokedex - SSG & SSR Demo using NextJS</title>
      </Head>

      <Stack minHeight="100vh">
        <Stack spacing={10} flexGrow={1} justify="center" align="center">
          <Header />

          <Stack direction="row" spacing={4} as="main">
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
        </Stack>

        <GithubLink />
      </Stack>
    </>
  );
}

const GithubLink = () => {
  return (
    <Flex
      as="a"
      href="https://github.com/calvo-jp/pokedex-chakra"
      rel="noreferrer"
      target="_blank"
      position="absolute"
      right={2}
      bottom={2}
      align="center"
      p={2}
      gap={2}
      color="gray.600"
      _hover={{ color: "gray.700" }}
    >
      <Text fontSize="sm">Source Code</Text>
      <ArrowForwardIcon />
    </Flex>
  );
};

interface CustomLinkProps {
  href: string;
  label: string;
  helperText: string;
}

const Link = ({ href, label, helperText }: CustomLinkProps) => {
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
    <Box>
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

const Credits = () => {
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
