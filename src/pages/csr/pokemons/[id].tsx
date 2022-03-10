import { useQuery } from "@apollo/client";
import { Flex, Spinner } from "@chakra-ui/react";
import PokemonWidget from "components/PokemonWidget";
import { GET_POKEMON } from "graphql/queries";
import useSearchParams from "hooks/useSearchParams";
import Head from "next/head";
import NotFound from "pages/404";
import { GetPokemon, GetPokemonVariables } from "types/GetPokemon";

const Pokemon = () => {
  const id = useSearchParams("id").get("id");

  const { data, loading, error } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    { skip: isNumeric(id), variables: { id: parseInt(id!) } }
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

  if (error || !data?.pokemon) return <NotFound />;

  return (
    <>
      <Head>
        <title>(CSR) Pokedex | {data.pokemon.name}</title>
      </Head>

      <PokemonWidget data={data.pokemon} redirectUrl="/csr/pokemons" />
    </>
  );
};

const isNumeric = (subject: any): subject is string => {
  return typeof subject === "string" && /^[0-9]$/.test(subject);
};

export default Pokemon;
