import { useQuery } from "@apollo/client";
import { Flex, Spinner } from "@chakra-ui/react";
import PokemonWidget from "components/PokemonWidget";
import { GET_POKEMON } from "graphql/queries";
import Head from "next/head";
import { useRouter } from "next/router";
import NotFound from "pages/404";
import { GetPokemon, GetPokemonVariables } from "types/GetPokemon";

const Pokemon = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, loading, error } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    { variables: { id: parseInt(id) } }
  );

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner
          thickness="0.5rem"
          speed="800ms"
          emptyColor="gray.300"
          color="orange.400"
          h={125}
          w={125}
        />
      </Flex>
    );
  }

  if (error || !data?.pokemon_v2_pokemon_by_pk) return <NotFound />;

  return (
    <>
      <Head>
        <title>(CSR) Pokedex | {data.pokemon_v2_pokemon_by_pk.name}</title>
      </Head>

      <PokemonWidget
        data={data.pokemon_v2_pokemon_by_pk}
        redirectUrl="/csr/pokemons"
      />
    </>
  );
};

export default Pokemon;
