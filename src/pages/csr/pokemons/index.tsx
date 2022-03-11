import { useQuery } from "@apollo/client";
import Pokemons from "components/Pokemons";
import { GET_POKEMONS } from "graphql/queries";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GetPokemons, GetPokemonsVariables } from "types/GetPokemons";

const PokemonsPage = () => {
  const [hasNext, setHasNext] = useState(true);
  // recent length of data
  const [counter, setCounter] = useState<number>();
  const { loading, fetchMore, data, error, refetch } = useQuery<
    GetPokemons,
    GetPokemonsVariables
  >(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
      limit: 30,
    },
    onCompleted({ pokemons }) {
      setCounter(pokemons.length);
      // no more rows
      if (counter && counter >= pokemons.length) setHasNext(false);
    },
  });

  const next = () => {
    if (hasNext) {
      fetchMore({
        variables: {
          offset: data ? data.pokemons.length : 0,
        },
      });
    }
  };

  useEffect(() => {
    return () => {
      setCounter(undefined);
      setHasNext(true);
    };
  }, []);

  return (
    <>
      <Head>
        <title>(CSR) Pokedex</title>
      </Head>

      <Pokemons
        data={data?.pokemons}
        loading={loading}
        shouldRetry={!!error}
        onRetry={refetch}
        onNextPage={next}
      />
    </>
  );
};

export default PokemonsPage;
