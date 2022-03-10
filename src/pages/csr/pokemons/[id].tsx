import PokemonWidget from "components/PokemonWidget";
import apolloClient from "config/apollo/client";
import { GET_POKEMON } from "graphql/queries";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { GetPokemon, GetPokemonVariables } from "types/GetPokemon";

interface Props {
  data: NonNullable<GetPokemon["pokemon_v2_pokemon_by_pk"]>;
}

interface Params {
  [key: string]: string;
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { data } = await apolloClient.query<GetPokemon, GetPokemonVariables>({
    query: GET_POKEMON,
    variables: {
      id: parseInt(params!.id),
    },
  });

  return !data.pokemon_v2_pokemon_by_pk
    ? { notFound: true }
    : { props: { data: data.pokemon_v2_pokemon_by_pk } };
};

const Pokemon: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>(CSR) Pokedex | {data.name}</title>
      </Head>
      <PokemonWidget data={data} redirectUrl="/csr/pokemons" />;
    </>
  );
};

export default Pokemon;
