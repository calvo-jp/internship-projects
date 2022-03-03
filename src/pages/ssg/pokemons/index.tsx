import { RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  CircularProgress,
  Flex,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import Header from "components/Header";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import useSSGPagination from "hooks/useSSGPagination";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useEffect } from "react";
import getPokemons from "utils/getPokemons";
import isScrolledToBottom from "utils/isScrolledToBottom";

interface Props {
  data: Awaited<ReturnType<typeof getPokemons>>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  // NOTICE:
  // I can only fetch data lesser than 30 to be statically generated
  // due to a (FALLBACK_BODY_TOO_LARGE) error in vercel,
  // which seems like something about the bandwidth limit? Sorry 😔
  // Other pages will still be fetched on the client side
  const data = await getPokemons();

  return {
    revalidate: 60 * 60 * 24 * 3, // 3days
    props: {
      data,
    },
  };
};

const Pokemons: NextPage<Props> = ({ data }) => {
  const { hasNext, next, rows, fetching, error } = useSSGPagination(data);

  const shouldShowError = error && !fetching;

  const handleScroll = useCallback(() => {
    if (!fetching && hasNext && isScrolledToBottom()) next();
  }, [fetching, hasNext, next]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <Head>
        <title>(SSR) Pokedex</title>
      </Head>

      <Header />

      <Stack as="main" p={4} spacing={4}>
        <PokemonList pokemons={rows} isSSG />

        {fetching && <Loader />}
        {shouldShowError && <ReloadTrigger onReload={next} />}
      </Stack>
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
