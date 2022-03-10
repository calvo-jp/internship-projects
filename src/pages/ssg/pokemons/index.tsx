import { useLazyQuery } from "@apollo/client";
import Pokemons from "components/Pokemons";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS } from "graphql/queries";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
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
      limit: 6,
    },
  });

  return {
    revalidate: 60 * 60 * 24 * 7,
    props: {
      data: data.pokemons,
    },
  };
};

const PokemonsPage: NextPage<Props> = ({ data }) => {
  const [rows, setRows] = useState(data);

  const [, { loading, error, fetchMore, refetch }] = useLazyQuery<
    GetPokemons,
    GetPokemonsVariables
  >(GET_POKEMONS, {
    variables: {
      offset: data.length,
      limit: 6,
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
    }).then(console.log);
  };

  return (
    <>
      <Head>
        <title>(SSG) Pokedex</title>
      </Head>

      <Pokemons
        data={rows}
        loading={loading}
        retry={!!error}
        onRetry={refetch}
        onNextPage={next}
        isSSG
      />
    </>
  );
};

export default PokemonsPage;
