import { useLazyQuery } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import Header from "components/Header";
import InfiniteScroll from "components/InfiniteScroll";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS } from "graphql/queries";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { GetPokemons, GetPokemonsVariables } from "types/GetPokemons";

interface Props {
  data: GetPokemons["pokemons"];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // pre-render only 30 rows,
  // other data will be fetched on the client-side
  const { data } = await apolloClient.query<GetPokemons, GetPokemonsVariables>({
    query: GET_POKEMONS,
    variables: {
      limit: 30,
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
  const [rows, setRows] = useState(data);

  const [, { loading, fetchMore }] = useLazyQuery<
    GetPokemons,
    GetPokemonsVariables
  >(GET_POKEMONS, {
    variables: {
      offset: data.length,
      limit: 30,
    },
    notifyOnNetworkStatusChange: true,
    onCompleted({ pokemons }) {
      setRows([...data, ...pokemons]);
    },
  });

  const next = async () => {
    await fetchMore({
      variables: {
        offset: rows.length,
      },
    });
  };

  return (
    <>
      <Head>
        <title>(SSG) Pokedex</title>
      </Head>

      <Header />

      <Stack as="main" p={{ base: 2, md: 4 }} spacing={{ base: 2, md: 4 }}>
        <PokemonList pokemons={rows} isSSG />

        {loading && <div>Loading...</div>}
      </Stack>

      <InfiniteScroll callback={next} paused={loading} />
      <ScrollToTopButton />
    </>
  );
};

export default Pokemons;
