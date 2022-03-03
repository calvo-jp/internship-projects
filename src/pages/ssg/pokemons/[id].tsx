import { Flex, Spinner } from "@chakra-ui/react";
import PokemonWidget from "components/PokemonWidget";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import IPokemon from "types/pokemon";
import getPokemon from "utils/getPokemon";
import getPokemons from "utils/getPokemons";

interface Props {
  data: IPokemon;
}

interface Params {
  [key: string]: string;
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await getPokemons();

  return {
    paths: data.rows.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const data = await getPokemon(params?.id);

  if (!data) return { notFound: true };

  return {
    revalidate: 60 * 60 * 24 * 3,
    props: {
      data,
    },
  };
};

const Pokemon: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return (
    <>
      <Head>
        <title>(SSR) Pokedex | {data.name}</title>
      </Head>
      <PokemonWidget data={data} redirectUrl="/ssg/pokemons" />;
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

export default Pokemon;
