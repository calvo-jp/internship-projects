import { Box, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import IPokemon from "types/pokemon";

interface PokemonCardProps {
  data: IPokemon;
  isSSG?: boolean;
}

const PokemonCard = ({ data, isSSG }: PokemonCardProps) => {
  const baseUrl = isSSG ? "/ssg/pokemons/" : "/ssr/pokemons/";

  return (
    <Link passHref href={baseUrl + data.id}>
      <Box
        display="block"
        as="a"
        border={1}
        borderColor="transparent"
        borderStyle="solid"
        background="white"
        shadow="md"
        p={4}
        w="full"
        rounded="sm"
        transition="all"
        transitionDuration="300ms"
        _hover={{
          borderColor: "orange.400",
          ring: 2,
          ringColor: "orange.100",
        }}
      >
        <Box position="relative" height={100}>
          <Box maxW={100} h="full" position="relative" mx="auto">
            <Image src={data.image} alt="" layout="fill"></Image>
          </Box>
        </Box>

        <Box mt={8}>
          <Text as="h2" fontSize="xl">
            {data.name}
          </Text>

          <Stack
            spacing={2}
            fontSize="xs"
            color="gray.500"
            direction="row"
            alignItems="center"
          >
            {[
              ["Types", data.types.length],
              ["Abilities", data.abilities.length],
              ["Moves", data.moves.length],
            ].map(([label, count]) => (
              <Box key={label}>
                {label}: {count}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default PokemonCard;
