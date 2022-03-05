import PokemonWidget from "components/PokemonWidget";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import IPokemon from "types/pokemon";
import getPokemon from "utils/getPokemon";

interface Props {
  data: IPokemon;
}

interface Params {
  [key: string]: string;
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const data = await getPokemon({ id: params!.id });
  return !data ? { notFound: true } : { props: { data } };
};

const Pokemon: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>(SSR) Pokedex | {data.name}</title>
      </Head>
      <PokemonWidget data={data} redirectUrl="/ssr/pokemons" />;
    </>
  );
};

export default Pokemon;
