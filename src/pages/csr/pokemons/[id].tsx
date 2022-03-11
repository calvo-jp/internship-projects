import { useQuery } from "@apollo/client";
import { Flex, Spinner } from "@chakra-ui/react";
import Pokemon from "components/Pokemon";
import { GET_POKEMON } from "graphql/queries";
import useSearchParams from "hooks/useSearchParams";
import Head from "next/head";
import NotFound from "pages/404";
import { GetPokemon, GetPokemonVariables } from "types/GetPokemon";

const PokemonPage = () => {
  const id = useSearchParams("id").get("id");

  const { data, loading, error } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    { skip: !isNumeric(id), variables: { id: parseInt(id!) } }
  );

  if (loading) return <Loader />;
  if (error || !data?.pokemon) return <NotFound />;

  return (
    <>
      <Head>
        <title>(CSR) Pokedex | {data.pokemon.name}</title>
      </Head>

      <Pokemon data={data.pokemon} redirectUrl="/csr/pokemons" />
    </>
  );
};

const Loader = () => {
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
};

const isNumeric = (subject: any): subject is string => {
  return typeof subject === "string" && /^[0-9]+$/.test(subject);
};

export default PokemonPage;
