import { Box, Text } from "@chakra-ui/react";

const Pokemons = () => {
  return (
    <Box minHeight="100vh" color="gray.700" scrollBehavior="smooth">
      <Header />
    </Box>
  );
};

const Header = () => {
  return (
    <Box
      as="header"
      minHeight={200}
      bgGradient="linear(to right, orange.400, yellow.400)"
      roundedBottom="3xl"
    >
      <Text as="h1" fontSize="6xl">
        POKEDEX
      </Text>
    </Box>
  );
};

export default Pokemons;
