import { Box, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import IPokemon from "types/pokemon";

interface PokemonCardProps {
  data: IPokemon;
}

const PokemonCard = ({ data }: PokemonCardProps) => {
  console.log(data.image);

  return (
    <Link passHref href={"/ssr/pokemons/" + data.id}>
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
          <Image src={data.image} alt="" layout="fill"></Image>
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
