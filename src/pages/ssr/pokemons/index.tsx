import { Box } from "@chakra-ui/react";
import Header from "components/Header";
import Pagination from "components/Pagination";
import PokemonList from "components/PokemonList";
import useSSRRedirect from "hooks/useSSRRedirect";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import services from "services";
import IPaginated from "types/paginated";

interface Props {
  data: IPaginated;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const data = await services.pokemons.read.all(context.query);
  return data.rows.length === 0 ? { notFound: true } : { props: { data } };
};

const Pokemons: NextPage<Props> = ({ data }) => {
  const redirect = useSSRRedirect();

  const next = () => {
    if (data.hasNext) redirect(data.page + 1, data.pageSize);
  };

  const prev = () => {
    if (data.hasPrevious) redirect(data.page - 1, data.pageSize);
  };

  return (
    <>
      <Head>
        <title>(SSR) Pokedex</title>
      </Head>

      <Header />

      <Box as="main" p={{ base: 2, md: 4 }}>
        <PokemonList pokemons={data.rows} />

        <Box mt={4}>
          <Pagination onPrev={prev} onNext={next} {...data} />
        </Box>
      </Box>
    </>
  );
};

export default Pokemons;
