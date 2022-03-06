import { Box, Heading, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
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
        as="a"
        display="block"
        border={1}
        borderColor="transparent"
        borderStyle="solid"
        bgColor="white"
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
          <Box h="full" position="relative" maxW={100} mx="auto">
            <Image src={data.image} alt="" layout="fill" />
          </Box>
        </Box>

        <Box mt={8}>
          <Heading fontSize="xl" fontWeight="normal">
            {data.name}
          </Heading>

          <Wrap spacing={2} color="gray.500" fontSize="xs">
            {[
              ["Types", data.types.length],
              ["Abilities", data.abilities.length],
              ["Moves", data.moves.length],
            ].map(([label, count]) => (
              <WrapItem key={label}>
                {label}: {count}
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Box>
    </Link>
  );
};

export default PokemonCard;
