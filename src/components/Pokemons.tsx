import { RepeatIcon } from "@chakra-ui/icons";
import { Box, CircularProgress, Flex, Stack, Text } from "@chakra-ui/react";
import Header from "components/Header";
import InfiniteScroll from "components/InfiniteScroll";
import PokemonList from "components/PokemonList";
import ScrollToTopButton from "components/ScrollToTopButton";
import { GetPokemons } from "types/GetPokemons";

interface PokemonsProps {
  data?: GetPokemons["pokemons"];
  shouldRetry?: boolean;
  onRetry?: () => void;
  loading?: boolean;
  onNextPage?: () => void;
  isSSG?: boolean;
}

const Pokemons = ({
  data,
  shouldRetry,
  onRetry,
  loading,
  onNextPage,
  isSSG,
}: PokemonsProps) => {
  return (
    <>
      <Header />

      <Stack as="main" p={{ base: 2, md: 4 }} spacing={{ base: 4, md: 8 }}>
        {data && <PokemonList pokemons={data} isSSG={isSSG} />}
        {loading && <Loader />}
        {!loading && shouldRetry && <ReloadTrigger onReload={onRetry} />}
      </Stack>

      <InfiniteScroll callback={onNextPage} paused={loading} />
      <ScrollToTopButton />
    </>
  );
};

interface ReloadTriggerProps {
  onReload?: () => void;
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

const Loader = () => {
  return (
    <Flex justify="center">
      <CircularProgress isIndeterminate color="green.300" size={8} />
    </Flex>
  );
};

export default Pokemons;
