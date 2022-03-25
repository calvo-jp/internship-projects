import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  HStack,
  Icon,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import Card from "components/widgets/card";
import Thumbnail from "components/widgets/Thumbnail";
import { GET_POKEMON, GET_POKEMON_EVOLUTION } from "graphql/pokeapi/queries";
import Link from "next/link";
import * as React from "react";
import capitalize from "utils/capitalize";
import getImageUrlById from "utils/pokemons/getImageUrlById";
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
  const { loading, data, refetch } = useQuery<
    GetPokemonEvolution,
    GetPokemonEvolutionVariables
  >(GET_POKEMON_EVOLUTION, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return (
      <Center>
        <Spinner size="lg" />
      </Center>
    );
  }

  // TODO: show error and option for refetch
  if (!data?.pokemon) return null;

  const pokemon = data.pokemon;
  const evolutions = pokemon.specy?.evolutionChain?.evolutions ?? [];
  const totalEvolutions = evolutions.length ?? 0;
  // find out the specy before pokemon evolved to its current form
  const currentSpecy = evolutions.find(({ name }) => pokemon.name === name);
  const fromSpecy = !currentSpecy
    ? null
    : evolutions.find(({ id }) => {
        return id === currentSpecy.evolvesFromSpeciesId;
      });

  // fallback to current pokemons name
  const fromSpecyName = fromSpecy?.name ?? pokemon.name;

  return (
    <Box>
      <Text maxW="403px" fontSize="sm">
        There are currently a total of {totalEvolutions} Pokémon in the{" "}
        {capitalize(pokemon.name)} family. {capitalize(pokemon.name)} evolves
        from {capitalize(fromSpecyName)} which costs{" "}
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
                    <Thumbnail
                      as="a"
                      w="88px"
                      h="88px"
                      src={getImageUrlById(evolvesFromSpeciesId ?? id)}
                    />
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
                    <Thumbnail
                      as="a"
                      w="88px"
                      h="88px"
                      src={getImageUrlById(id)}
                    />
                  </Link>
                  <Text fontSize="sm">{name}</Text>
                </VStack>
              </HStack>
            </Center>
          ))}
        </VStack>
      </Card>
    </Box>
  );
};

const PokemonName = ({ id }: { id: number }) => {
  const { loading, data } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    { variables: { id } }
  );

  return (
    <Text fontSize="sm">
      {loading && "loading..."}
      {!loading && (data?.pokemon?.name ?? "unknown")}
    </Text>
  );
};

export default Evolution;
