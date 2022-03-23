import { useQuery } from "@apollo/client";
import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import Card from "components/widgets/card";
import Thumbnail from "components/widgets/thumbnail";
import { GET_POKEMON, GET_POKEMON_EVOLUTION } from "graphql/pokeapi/queries";
import * as React from "react";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
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

  // TODO: add loader
  if (loading) return null;

  // TODO: show error and option for refetch
  if (!data?.pokemon) return null;

  const pokemon = data.pokemon;
  const evolutions = pokemon.specy?.evolutionChain?.evolutions ?? [];
  const totalEvolutions = evolutions.length ?? 0;
  const currentSpecy = evolutions.find(({ name }) => pokemon.name === name);
  const fromSpecy = !currentSpecy
    ? null
    : evolutions.find(({ evolvesFromSpeciesId }) => {
        return evolvesFromSpeciesId === currentSpecy.id;
      });
  // fallback to unknown
  const fromSpecyName = fromSpecy?.name ?? "unknown";

  return (
    <Box>
      <Text maxW="403px" fontSize="sm">
        There are currently a total of {totalEvolutions} Pokémon in the{" "}
        {pokemon.name} family. {pokemon.name} evolves from {fromSpecyName} which
        costs{" "}
        <Text as="b" fontWeight="semibold">
          25 Candy.
        </Text>
      </Text>

      <Card mt={4} w="full">
        <VStack spacing={6}>
          {data.pokemon.specy?.evolutionChain?.evolutions.map((item) => (
            <Center key={item.id}>
              <HStack spacing={{ base: 12, md: 24, lg: 44 }}>
                <VStack spacing={2}>
                  <Thumbnail
                    w="88px"
                    h="88px"
                    src={getPokemonImageUrl(
                      item.evolvesFromSpeciesId ?? item.id
                    )}
                  />

                  <PokemonName id={item.evolvesFromSpeciesId ?? item.id} />
                </VStack>

                <VStack>
                  <Icon
                    as={ArrowNarrowRightIcon}
                    stroke="brand.primary"
                    fontSize="2xl"
                  />

                  <Text fontSize="sm">
                    {item.evolvesWhen.at(0)?.level ?? 0}
                  </Text>
                </VStack>

                <VStack spacing={2}>
                  <Thumbnail
                    w="88px"
                    h="88px"
                    src={getPokemonImageUrl(item.id)}
                  />

                  <Text fontSize="sm">{item.name}</Text>
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
      {!loading && data?.pokemon ? data.pokemon.name : ""}
    </Text>
  );
};

export default Evolution;
