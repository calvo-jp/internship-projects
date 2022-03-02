import { Box } from "@chakra-ui/react";
import Header from "components/Header";
import Pagination from "components/Pagination";
import PokemonList from "components/PokemonList";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import getPokemons from "utils/getPokemons";

interface Props {
  data: Awaited<ReturnType<typeof getPokemons>>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const data = await getPokemons(context.query);
  return data.rows.length === 0 ? { notFound: true } : { props: { data } };
};

const Pokemons: NextPage<Props> = ({ data }) => {
  const router = useRouter();

  const redirect = (page: number) => {
    router.push({
      pathname: "/ssr/pokemons",
      query: {
        page,
        pageSize: data.pageSize,
      },
    });
  };

  const next = () => {
    if (data.hasNext) redirect(data.page + 1);
  };

  const prev = () => {
    if (data.hasPrevious) redirect(data.page - 1);
  };

  return (
    <>
      <Head>
        <title>(SSR) Pokedex</title>
      </Head>

      <Header />

      <Box as="main" p={4}>
        <PokemonList pokemons={data.rows} />
        <Pagination onPrev={prev} onNext={next} {...data} />
      </Box>
    </>
  );
};

export default Pokemons;
