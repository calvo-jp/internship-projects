import { Flex, Spinner } from "@chakra-ui/react";
import Pokemon from "components/Pokemon";
import apolloClient from "config/apollo/client";
import { GET_POKEMON, GET_POKEMONS } from "graphql/queries";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetPokemon, GetPokemonVariables } from "types/GetPokemon";
import { GetPokemons, GetPokemonsVariables } from "types/GetPokemons";

interface Params {
  [key: string]: string;
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { data } = await apolloClient.query<GetPokemons, GetPokemonsVariables>({
    query: GET_POKEMONS,
    variables: {
      limit: 50,
    },
  });

  return {
    fallback: true,
    paths: data.pokemons.map(({ id }) => ({
      params: { id: id.toString() },
    })),
  };
};

interface Props {
  data: NonNullable<GetPokemon["pokemon"]>;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { data } = await apolloClient.query<GetPokemon, GetPokemonVariables>({
    query: GET_POKEMON,
    variables: {
      id: parseInt(params!.id),
    },
  });

  if (!data.pokemon) return { notFound: true };

  return {
    revalidate: 60 * 60 * 24 * 7,
    props: {
      data: data.pokemon,
    },
  };
};

const PokemonPage: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return (
    <>
      <Head>
        <title>(SSG) Pokedex | {data.name}</title>
      </Head>
      <Pokemon data={data} redirectUrl="/ssg/pokemons" />
    </>
  );
};

const Loader = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>

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
    </>
  );
};

export default PokemonPage;
