import { Stack } from "@chakra-ui/react";
import Header from "components/Header";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS } from "graphql/queries";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { GetPokemons, GetPokemonsVariables } from "types/GetPokemons";

interface Props {
  data: GetPokemons["pokemons"];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // pre-render only 50 rows,
  // other data will be fetched on the client-side
  const { data } = await apolloClient.query<GetPokemons, GetPokemonsVariables>({
    query: GET_POKEMONS,
    variables: {
      limit: 500,
    },
  });

  return {
    revalidate: 60 * 60 * 24 * 7,
    props: {
      data: data.pokemons,
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
      </Stack>

      <ScrollToTopButton />
    </>
  );
};

export default Pokemons;
