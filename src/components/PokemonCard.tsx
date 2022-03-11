import { Box, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GetPokemons } from "types/GetPokemons";
import getPokemonImage from "utils/getPokemonImage";

interface PokemonCardProps {
  data: GetPokemons["pokemons"][number];
  isSSG?: boolean;
}

const PokemonCard = ({ data, isSSG }: PokemonCardProps) => {
  const baseUrl = isSSG ? "/ssg/pokemons/" : "/csr/pokemons/";

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
            <ImageWithFallback src={getPokemonImage(data)} />
          </Box>
        </Box>

        <Box mt={8}>
          <Heading fontSize="xl" fontWeight="normal">
            {data.name}
          </Heading>

          <Wrap spacing={2} color="gray.500" fontSize="xs">
            {[
              ["Types", coalesceToZero(data.abilities.aggregate?.count)],
              ["Abilities", coalesceToZero(data.abilities.aggregate?.count)],
              ["Moves", coalesceToZero(data.moves.aggregate?.count)],
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

const ImageWithFallback = ({ src }: { src: string }) => {
  const [source, setSource] = useState(src);

  return (
    <Image
      src={source}
      alt=""
      layout="fill"
      onError={() => setSource("/pokeball.png")}
    />
  );
};

const coalesceToZero = (subject: null | undefined | number) => {
  return !subject ? 0 : subject;
};

export default PokemonCard;
