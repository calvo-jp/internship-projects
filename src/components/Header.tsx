import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      as="header"
      minHeight={200}
      bgGradient="linear(to right, orange.400, yellow.400)"
      roundedBottom="3xl"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Link passHref href="/">
        <a>
          <Text as="h1" fontSize="6xl" fontWeight={700} lineHeight={1}>
            POKEDEX
          </Text>
        </a>
      </Link>

      <Text as="p">Powered by pokeapi</Text>
    </Box>
  );
};

export default Header;
