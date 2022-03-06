import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import pokeball from "assets/pokeball.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <VStack
      as="header"
      bgGradient="linear(to right, orange.400, yellow.500)"
      roundedBottom={{ base: 0, md: "3xl" }}
      color="white"
      position="relative"
      overflow="hidden"
      py={{ base: 8, md: 12 }}
    >
      <Brand />

      <Box
        display={{ base: "none", md: "block" }}
        position="absolute"
        h={150}
        w={150}
        right={-8}
        bottom={-8}
        opacity=".4"
      >
        <Box position="relative" w="full" h="full">
          <Image src={pokeball} alt="" layout="fill" />
        </Box>
      </Box>
    </VStack>
  );
};

const Brand = () => {
  return (
    <Link href="/" passHref>
      <VStack as="a">
        <Heading as="h1" fontSize="6xl" fontWeight={700} lineHeight={0.8}>
          POKEDEX
        </Heading>

        <Text as="p" lineHeight={0.8} opacity="0.9">
          Powered by pokeapi
        </Text>
      </VStack>
    </Link>
  );
};

export default Header;
