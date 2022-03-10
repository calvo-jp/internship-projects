import { useQuery } from "@apollo/client";
import { RepeatIcon } from "@chakra-ui/icons";
import { Box, CircularProgress, Flex, Stack, Text } from "@chakra-ui/react";
import Header from "components/Header";
import InfiniteScroll from "components/InfiniteScroll";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import { GET_POKEMONS } from "graphql/queries";
import Head from "next/head";
import { GetPokemons, GetPokemonsVariables } from "types/GetPokemons";

const Pokemons = () => {
  const { loading, fetchMore, data, error, refetch } = useQuery<
    GetPokemons,
    GetPokemonsVariables
  >(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      limit: 20,
    },
  });

  const next = () => {
    fetchMore({
      variables: {
        offset: data ? data.pokemons.length : 0,
        limit: 20,
      },
    });
  };

  return (
    <>
      <Head>
        <title>(SSR) Pokedex</title>
      </Head>

      <Header />

      <Stack as="main" p={{ base: 2, md: 4 }} spacing={{ base: 2, md: 4 }}>
        {data && <PokemonList pokemons={data.pokemons} />}
        {loading && <Loader />}
        {!loading && error && <ReloadTrigger onReload={refetch} />}
      </Stack>

      <InfiniteScroll callback={next} paused={loading} />
      <ScrollToTopButton />
    </>
  );
};

interface ReloadTriggerProps {
  onReload: () => void;
}

const ReloadTrigger = ({ onReload }: ReloadTriggerProps) => {
  return (
    <Stack fontSize="sm" color="gray.500" direction="row" justify="center">
      <Text>Something went wrong.</Text>

      <Box as="button" onClick={onReload}>
        <RepeatIcon />
      </Box>
    </Stack>
  );
};

const Loader = () => {
  return (
    <Flex justify="center">
      <CircularProgress isIndeterminate color="green.300" size={8} />
    </Flex>
  );
};

export default Pokemons;
