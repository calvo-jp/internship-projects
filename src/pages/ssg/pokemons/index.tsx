import { RepeatIcon } from "@chakra-ui/icons";
import { Box, CircularProgress, Flex, Stack, Text } from "@chakra-ui/react";
import Header from "components/Header";
import InfiniteScroll from "components/InfiniteScroll";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import useSSGPagination from "hooks/useSSGPagination";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import services from "services";
import IPaginated from "types/paginated";

interface Props {
  data: IPaginated;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // pre-render only 50 rows,
  // other data will be fetched on the client-side
  const data = await services.pokemons.read.all({ pageSize: 50 });

  return {
    revalidate: 60 * 60 * 24 * 7,
    props: {
      data,
    },
  };
};

const Pokemons: NextPage<Props> = ({ data }) => {
  const { hasNext, next, rows, fetching, error } = useSSGPagination(data);

  return (
    <>
      <Head>
        <title>(SSR) Pokedex</title>
      </Head>

      <Header />

      <Stack as="main" p={{ base: 2, md: 4 }} spacing={{ base: 2, md: 4 }}>
        <PokemonList pokemons={rows} isSSG />

        {fetching && <Loader />}
        {!fetching && error && <ReloadTrigger onReload={next} />}
      </Stack>

      <InfiniteScroll callback={next} disabled={fetching || !hasNext} />
      <ScrollToTopButton />
    </>
  );
};

const Loader = () => {
  return (
    <Flex justify="center">
      <CircularProgress isIndeterminate color="green.300" size={8} />
    </Flex>
  );
};

interface ReloadTriggerProps {
  onReload: () => void;
}

const ReloadTrigger = ({ onReload }: ReloadTriggerProps) => {
  return (
    <Stack fontSize="sm" color="gray.500" direction="row" justify="center">
      <Text>Something went wrong.</Text>

      <Box as="button" onClick={onReload}>
        <RepeatIcon />
      </Box>
    </Stack>
  );
};

export default Pokemons;
