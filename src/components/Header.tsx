import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react";
import pokeball from "assets/pokeball.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      as="header"
      position="relative"
      overflow="hidden"
      roundedBottom={{ base: 0, md: "3xl" }}
      bgGradient="linear(to right, orange.400, yellow.500)"
      color="white"
      py={{ base: 8, md: 12 }}
    >
      <Center>
        <Brand />
      </Center>

      <BgImage />
    </Box>
  );
};

const BgImage = () => {
  return (
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
