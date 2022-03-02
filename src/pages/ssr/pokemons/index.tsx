import { Box, Container, Flex, Grid, GridItem } from "@chakra-ui/react";
import Header from "components/Header";
import Pagination from "components/Pagination";
import PokemonCard from "components/PokemonCard";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import IPokemon from "types/pokemon";
import calcOffset from "utils/calcOffset";
import getPokemons from "utils/getPokemons";

interface Props {
  data: Awaited<ReturnType<typeof getPokemons>>;
}

interface Params {
  page: string;
  [key: string]: string;
}

export const getServerSideProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const page = params?.page;
  const limit = 30;
  const offset = calcOffset({ page, limit });

  const endpoint = `${process.env.API_BASE_URL}?limit=${limit}&offset=${offset}`;
  const data = await getPokemons(endpoint);

  return {
    props: {
      data,
    },
  };
};

const Pokemons: NextPage<Props> = ({ data }) => {
  const next = () => {};

  const prev = () => {};

  return (
    <>
      <Head>
        <title>(SSR) Pokemons</title>
      </Head>

      <Header />

      <Box as="main" p={4}>
        <PokemonList pokemons={data.results} />
        <Pagination onPrev={prev} onNext={next} />
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
