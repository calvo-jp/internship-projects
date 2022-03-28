import apolloClient from "config/apollo/client";
import { GET_POKEMON, GET_POKEMONS } from "graphql/pokeapi/queries";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import services from "services";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";
import { GetPokemons, GetPokemonsVariables } from "__generated__/GetPokemons";

interface Params {
  id: string;
  [key: string]: any;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloClient.query<GetPokemons, GetPokemonsVariables>({
    query: GET_POKEMONS,
    variables: {
      limit: 50,
      offset: 0,
      types: await services.pokemons.types.read.all(),
    },
  });

  return {
    fallback: "blocking",
    paths: result.data.pokemons.map(({ id }) => ({
      params: { id: id.toString() },
    })),
  };
};

type TPokemon = NonNullable<GetPokemon["pokemon"]>;

interface Props {
  pokemon: TPokemon;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = params ? parseInt(params.id) : NaN;

  if (Number.isNaN(id)) return { notFound: true };

  const result = await apolloClient.query<GetPokemon, GetPokemonVariables>({
    query: GET_POKEMON,
    variables: { id },
  });

  if (!result.data.pokemon) return { notFound: true };

  return {
    revalidate: 60 * 60 * 24 * 3,
    props: {
      pokemon: result.data.pokemon,
    },
  };
};

const OpenGraph = ({ pokemon }: Props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Pokedex | {pokemon.name}</title>

        <meta
          property="og:url"
          content={
            "https://internship-project-pokedex.vercel.app/pokemons/" +
            pokemon.id
          }
        />
        <meta property="og:site_name" content="Pokedex" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={"Pokedex | " + pokemon.name} />
        <meta
          property="og:description"
          content={pokemon.others?.descriptions.at(0)?.description}
        />
        <meta
          property="og:image"
          content={getImageUrlById(pokemon.id, "PNG")}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@calvo__jp" />
        <meta name="twitter:creator" content="@calvo__jp" />
      </Head>
    </React.Fragment>
  );
};

export default OpenGraph;
