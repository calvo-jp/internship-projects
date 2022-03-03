import { Box, Flex, Stack } from "@chakra-ui/react";
import Header from "components/Header";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import useSSGPagination from "hooks/useSSGPagination";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import IPokemon from "types/pokemon";
import getPokemons from "utils/getPokemons";

interface Props {
  pokemons: IPokemon[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getPokemons({ pageSize: 120 });

  return {
    revalidate: 60 * 60 * 24 * 3, // 3days
    props: {
      pokemons: data.rows,
    },
  };
};

const Pokemons: NextPage<Props> = ({ pokemons }) => {
  const { next, rows, hasNext } = useSSGPagination(pokemons);

  return (
    <>
      <Head>
        <title>(SSR) Pokedex</title>
      </Head>

      <Header />

      <Stack as="main" p={4} spacing={4}>
        <PokemonList pokemons={rows} isSSG />

        {hasNext && (
          <Flex justify="center">
            <Box
              as="button"
              fontWeight="normal"
              fontSize="sm"
              onClick={next}
              color="gray.500"
              _hover={{ color: "gray.600" }}
            >
              Load more
            </Box>
          </Flex>
        )}
      </Stack>

      <ScrollToTopButton />
    </>
  );
};

export default Pokemons;
