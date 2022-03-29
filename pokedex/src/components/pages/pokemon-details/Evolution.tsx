import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import Card from "components/widgets/card";
import Photo from "components/widgets/Photo";
import { GET_POKEMON, GET_POKEMON_EVOLUTION } from "graphql/pokeapi/queries";
import Link from "next/link";
import { forwardRef } from "react";
import capitalize from "utils/capitalize";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import unkebab from "utils/unkebab";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";
import {
  GetPokemonEvolution,
  GetPokemonEvolutionVariables,
} from "__generated__/GetPokemonEvolution";

interface EvolutionProps {
  /** pokemon id */
  id: number;
}

const Evolution = ({ id }: EvolutionProps) => {
  const { loading, data } = useQuery<
    GetPokemonEvolution,
    GetPokemonEvolutionVariables
  >(GET_POKEMON_EVOLUTION, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Loader />;
  if (!data?.pokemon) return null;

  const pokemon = data.pokemon;
  const evolutions = pokemon.specy?.evolutionChain?.evolutions ?? [];
  // find out the specy before pokemon evolved to its current form
  const currentSpecy = evolutions.find(({ name }) => pokemon.name === name);
  const fromSpecy = !currentSpecy
    ? null
    : evolutions.find(({ id }) => {
        return id === currentSpecy.evolvesFromSpeciesId;
      });

  // fallback to current pokemons name
  const fromSpecyName = fromSpecy?.name ?? pokemon.name;
  const partialDescription = `
  There are currently a total of ${evolutions.length} Pokémon in the
  ${capitalize(unkebab(pokemon.name))} family.
  ${capitalize(unkebab(pokemon.name))} evolves
  from ${capitalize(unkebab(fromSpecyName))} which costs `;

  return (
    <Box>
      <Text maxW="403px" fontSize="sm">
        {partialDescription}
        <Text as="b" fontWeight="semibold">
          25 Candy.
        </Text>
      </Text>

      <Card mt={4} w="full">
        <VStack spacing={6}>
          {evolutions.map(({ id, evolvesFromSpeciesId, evolvesWhen, name }) => (
            <Center key={id}>
              <HStack spacing={{ base: 12, md: 24, lg: 44 }}>
                <VStack spacing={2}>
                  <Link
                    passHref
                    href={"/pokemons/" + (evolvesFromSpeciesId ?? id)}
                  >
                    <Thumbnail id={evolvesFromSpeciesId ?? id} />
                  </Link>
                  <PokemonName id={evolvesFromSpeciesId ?? id} />
                </VStack>

                <VStack>
                  <Icon
                    as={ArrowNarrowRightIcon}
                    stroke="brand.primary"
                    fontSize="2xl"
                  />
                  <Text fontSize="sm">{evolvesWhen.at(0)?.level ?? 1}</Text>
                </VStack>

                <VStack spacing={2}>
                  <Link passHref href={"/pokemons/" + id}>
                    <Thumbnail id={id} />
                  </Link>
                  <Text fontSize="sm">{unkebab(name)}</Text>
                </VStack>
              </HStack>
            </Center>
          ))}
        </VStack>
      </Card>
    </Box>
  );
};

const Loader = () => {
  return (
    <Center>
      <Spinner size="lg" />
    </Center>
  );
};

interface ThumbnailProps {
  id: number;
}

const Thumbnail = forwardRef<any, ThumbnailProps>(({ id }, ref) => {
  return (
    <Flex
      ref={ref}
      as="a"
      w="88px"
      h="88px"
      align="center"
      shadow="sm"
      justify="center"
      bgColor="others.gray.800"
    >
      <Photo
        maxW="60%"
        maxH="60%"
        src={getImageUrlById(id)}
        loader={<Spinner size="sm" />}
        fallback={getImageUrlById(id, "PNG")}
        data-lightbox-item=""
      />
    </Flex>
  );
});

Thumbnail.displayName = "Thumbnail";

const PokemonName = ({ id }: { id: number }) => {
  const { loading, data } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    { variables: { id } }
  );

  return (
    <Text fontSize="sm">
      {loading && "loading..."}
      {!loading && data?.pokemon && unkebab(data.pokemon.name)}
      {!loading && !data?.pokemon && "unknown"}
    </Text>
  );
};

export default Evolution;
