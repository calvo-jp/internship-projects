import { RepeatIcon } from "@chakra-ui/icons";
import { Box, CircularProgress, Flex, Stack, Text } from "@chakra-ui/react";
import Header from "components/Header";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS } from "graphql/queries";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { GetPokemons } from "types/GetPokemons";

interface Props {
  data: GetPokemons["pokemon_v2_pokemon"];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // pre-render only 50 rows,
  // other data will be fetched on the client-side
  const { data } = await apolloClient.query<GetPokemons>({
    query: GET_POKEMONS,
  });

  return {
    revalidate: 60 * 60 * 24 * 7,
    props: {
      data: data.pokemon_v2_pokemon,
    },
  };
};

const Pokemons: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>(SSG) Pokedex</title>
      </Head>

      <Header />

      <Stack as="main" p={{ base: 2, md: 4 }} spacing={{ base: 2, md: 4 }}>
        <PokemonList pokemons={data} isSSG />

        {/* {fetching && <Loader />}
        {!fetching && error && <ReloadTrigger onReload={next} />} */}
      </Stack>

      {/* <InfiniteScroll callback={next} paused={fetching || !hasNext} /> */}
      <ScrollToTopButton />
    </>
  );
};

const Loader = () => {
  return (
    <Flex justify="center">
      <CircularProgress isIndeterminate color="green.300" size={8} />
    </Flex>
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

export default Pokemons;
