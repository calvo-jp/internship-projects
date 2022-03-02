import { Box, Flex } from "@chakra-ui/react";
import Header from "components/Header";
import Pagination from "components/Pagination";
import PokemonCard from "components/PokemonCard";
import { GetStaticProps, NextPage } from "next";
import IPokemon from "types/pokemon";
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
  const page = [params?.page].flat(1).at(0);

  let offset: number;

  offset = page ? parseInt(page) : 1;
  offset = offset <= 1 ? 1 : offset;
  offset = (offset - 1) * 30;

  const endpoint = `${process.env.API_BASE_URL}?limit=30&offset=${offset}`;
  const data = await getPokemons(endpoint);

  return {
    props: {
      data,
    },
  };
};

const Pokemons: NextPage<Props> = ({ data }) => {
  const next = (page: number) => {};

  const prev = (page: number) => {};

  return (
    <Box minHeight="100vh" color="gray.700" scrollBehavior="smooth">
      <Header />

      <Box as="main" p={4}>
        <PokemonList pokemons={data.results} />

        <Pagination
          prev={!!data.previous}
          next={!!data.next}
          onPrev={prev}
          onNext={next}
        />
      </Box>
    </Box>
  );
};

interface PokemonListProps {
  pokemons: IPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <Flex gap={4} direction="column">
      {pokemons.map((pokemon) => (
        <PokemonCard data={pokemon} key={pokemon.id} />
      ))}
    </Flex>
  );
};

export default Pokemons;
