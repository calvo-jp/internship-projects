import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import HomepageLayout from "components/layouts/homepage";
import GridView from "components/pages/pokemon-list/GridView";
import ListView from "components/pages/pokemon-list/ListView";
import Pagination from "components/pages/pokemon-list/Pagination";
import Toolbar from "components/pages/pokemon-list/Toolbar";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS, GET_POKEMONS_TOTAL } from "graphql/pokeapi/queries";
import useNavigate from "hooks/useNavigate";
import useStore from "hooks/useStore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import services from "services";
import coalesce from "utils/coalesce";
import { GetPokemons, GetPokemonsVariables } from "__generated__/GetPokemons";
import {
  GetPokemonsTotal,
  GetPokemonsTotalVariables,
} from "__generated__/GetPokemonsTotal";

type TPokemon = GetPokemons["pokemons"][number];

interface Props {
  rows: TPokemon[];
  page: number;
  pageSize: number;
  hasNext: boolean;
  totalRows: number;
  search?: {
    types?: string[];
  };
}

// NEEDS REFACTORING!!
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const page = coalesce(queryToInt(query.page), 1);
  const limit = coalesce(queryToInt(query.pageSize), 20);
  const offset = (page - 1) * limit;

  // Getting types filter encoded via native URLSearchParams.toString()
  // where arrays are joined using commas
  const types =
    [query.types]
      .flat()
      .at(0)
      ?.split(/\,/g)
      .map((value) => value.trim().toLowerCase())
      .filter((value) => value.length > 0) ?? [];

  // There is an issue when not passing filter to apollo query
  // even if it is already optional. As a workarround,
  // we are passing in all the types in case query is not provided
  const filters =
    types.length > 0 ? types : await services.pokemons.types.read.all();

  const requests = [
    apolloClient.query<GetPokemons, GetPokemonsVariables>({
      query: GET_POKEMONS,
      variables: {
        limit,
        offset,
        types: filters,
      },
    }),

    apolloClient.query<GetPokemonsTotal, GetPokemonsTotalVariables>({
      query: GET_POKEMONS_TOTAL,
      variables: {
        types: filters,
      },
    }),
  ] as const;

  const [getPokemonsResult, getPokemonsTotalResult] = await Promise.allSettled(
    requests
  );

  const rows =
    getPokemonsResult.status === "fulfilled" && getPokemonsResult.value
      ? getPokemonsResult.value.data.pokemons
      : [];

  const totalRows =
    getPokemonsTotalResult.status === "fulfilled" &&
    getPokemonsTotalResult.value
      ? getPokemonsTotalResult.value.data.summary.aggregate?.count ?? 0
      : 0;

  return {
    props: {
      page,
      pageSize: limit,
      rows,
      totalRows,
      hasNext: totalRows > page * limit,
      search: {
        types,
      },
    },
  };
};

// TODO
// - Add component for zero or no records found
const Pokemons = ({ rows, page, pageSize, hasNext, search }: Props) => {
  const { basePath } = useRouter();

  const navigate = useNavigate();

  const listView = useStore((state) => state.listView);
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const next = () => {
    if (!hasNext) return;

    navigate(basePath, {
      page: page + 1,
      pageSize,
      types: search?.types,
    });
  };

  const prev = () => {
    if (page <= 1) return;

    navigate(basePath, {
      page: page - 1,
      pageSize,
      types: search?.types,
    });
  };

  const filter = (types: string[]) => {
    navigate(basePath, {
      page,
      pageSize,
      types,
    });
  };

  React.useEffect(() => {
    setView(listView ? "list" : "grid");
  }, [listView]);

  return (
    <React.Fragment>
      <Head>
        <title>Pokedex</title>
      </Head>

      <HomepageLayout>
        <Box p={{ base: 4, md: 8, lg: 12 }} maxW="container.lg" mx="auto">
          <HStack as="section" justify="space-between">
            <Heading
              fontSize="2xl"
              color="brand.gray.100"
              fontWeight="semibold"
            >
              Choose Pokemon
            </Heading>

            <Toolbar filters={search?.types} onFilter={filter} />
          </HStack>

          <Flex
            as="section"
            mt={{ base: 6, lg: 12 }}
            gap={{ base: 4, lg: 8 }}
            direction="column"
          >
            {view === "list" && <ListView data={rows} />}
            {view === "grid" && <GridView data={rows} />}

            <Pagination onNext={next} onPrev={prev} />
          </Flex>
        </Box>
      </HomepageLayout>
    </React.Fragment>
  );
};

type ParsedQueryValue = string | string[] | undefined;

/**
 *
 * Parses query to int or returns undefined
 *
 */
const queryToInt = (subject: ParsedQueryValue) => {
  const scalar = [subject].flat(1).at(0);
  if (scalar && isNumeric(scalar)) return parseInt(scalar);
};

const isNumeric = (value: string) => /\d+/.test(value);

export default Pokemons;
