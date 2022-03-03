import { Box, Text } from "@chakra-ui/react";
import pokeball from "assets/pokeball.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      as="header"
      height={180}
      bgGradient="linear(to right, orange.400, yellow.500)"
      roundedBottom="3xl"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      <Link passHref href="/">
        <a>
          <Text as="h1" fontSize="6xl" fontWeight={700} lineHeight={1}>
            POKEDEX
          </Text>
        </a>
      </Link>

      <Text as="p">Powered by pokeapi</Text>

      <Box
        position="absolute"
        height={150}
        width={150}
        right={-8}
        bottom={-8}
        opacity=".4"
      >
        <Image src={pokeball} alt="" layout="fill" />
      </Box>
    </Box>
  );
};

export default Header;
