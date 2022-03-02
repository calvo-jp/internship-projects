import { Box, Grid, GridItem } from "@chakra-ui/react";
import Header from "components/Header";
import Pagination from "components/Pagination";
import PokemonCard from "components/PokemonCard";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import IPokemon from "types/pokemon";
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
        <title>(SSR) Pokemons</title>
      </Head>

      <Header />

      <Box as="main" p={4}>
        <PokemonList pokemons={data.rows} />
        <Pagination onPrev={prev} onNext={next} {...data} />
      </Box>
    </>
  );
};

interface PokemonListProps {
  pokemons: IPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <Grid
      gap={4}
      flexWrap="wrap"
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
      }}
    >
      {pokemons.map((pokemon) => (
        <GridItem key={pokemon.id}>
          <PokemonCard data={pokemon} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default Pokemons;
