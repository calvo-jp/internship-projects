import { useQuery } from "@apollo/client";
import Pokemons from "components/Pokemons";
import { GET_POKEMONS } from "graphql/queries";
import Head from "next/head";
import { GetPokemons, GetPokemonsVariables } from "types/GetPokemons";

const PokemonsPage = () => {
  const { loading, fetchMore, data, error, refetch } = useQuery<
    GetPokemons,
    GetPokemonsVariables
  >(GET_POKEMONS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      offset: 0,
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
