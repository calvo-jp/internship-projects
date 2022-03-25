import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import HomepageLayout from "components/layouts/homepage";
import GridView from "components/pages/pokemon-list/GridView";
import ListView from "components/pages/pokemon-list/ListView";
import Pagination from "components/pages/pokemon-list/Pagination";
import Toolbar from "components/pages/pokemon-list/Toolbar";
import apolloClient from "config/apollo/client";
import {
  GET_POKEMONS,
  GET_POKEMONS_BY_TYPES,
  GET_POKEMONS_TOTAL,
  GET_POKEMONS_TOTAL_BY_TYPES,
} from "graphql/pokeapi/queries";
import useNavigate from "hooks/useNavigate";
import useStore from "hooks/useStore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import coalesce from "utils/coalesce";
import { GetPokemons, GetPokemonsVariables } from "__generated__/GetPokemons";
import {
  GetPokemonsByTypes,
  GetPokemonsByTypesVariables,
} from "__generated__/GetPokemonsByTypes";
import { GetPokemonsTotal } from "__generated__/GetPokemonsTotal";
import { GetPokemonsTotalByTypesVariables } from "__generated__/GetPokemonsTotalByTypes";

type TPokemon = GetPokemons["pokemons"][number];

interface Props {
  rows: TPokemon[];
  page: number;
  pageSize: number;
  hasNext: boolean;
  count: number;
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

  // getting types filter encoded via native URLSearchParams.toString()
  // where arrays are joined using commas
  const types = [query.types]
    .flat()
    .at(0)
    ?.split(/\,/g)
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value.length > 0);

  //
  // =================
  // FILTERED BY TYPES
  // =================
  //

  if (types && types.length > 0) {
    const requests = [
      apolloClient.query<GetPokemonsTotal, GetPokemonsTotalByTypesVariables>({
        query: GET_POKEMONS_TOTAL_BY_TYPES,
        variables: {
          types,
        },
      }),

      apolloClient.query<GetPokemonsByTypes, GetPokemonsByTypesVariables>({
        query: GET_POKEMONS_BY_TYPES,
        variables: {
          limit,
          offset,
          types,
        },
      }),
    ];

    const results = await Promise.allSettled(requests);

    let rows: TPokemon[] = [];
    let count = 0;

    for (const result of results) {
      if (result.status === "fulfilled" && result.value) {
        const data = result.value.data;

        // pokemons
        if ("pokemons" in data) rows = data.pokemons;

        // summary
        if ("summary" in data && data.summary.aggregate)
          count = data.summary.aggregate.count;
      }
    }

    return {
      props: {
        page,
        pageSize: limit,
        rows,
        hasNext: count > page * limit,
        count,
        search: {
          types,
        },
      },
    };
  }

  //
  // ==============
  // WITHOUT FILTER
  // ==============
  //

  const requests = [
    apolloClient.query<GetPokemons, GetPokemonsVariables>({
      query: GET_POKEMONS,
      variables: {
        limit,
        offset,
      },
    }),

    apolloClient.query<GetPokemonsTotal>({
      query: GET_POKEMONS_TOTAL,
    }),
  ];

  let rows: TPokemon[] = [];
  let count = 0;

  const results = await Promise.allSettled(requests);

  for (const result of results) {
    if (result.status === "fulfilled" && result.value) {
      const data = result.value.data;

      // pokemons
      if ("pokemons" in data) rows = data.pokemons;

      // summary
      if ("summary" in data && data.summary.aggregate)
        count = data.summary.aggregate.count;
    }
  }

  return {
    props: {
      page,
      pageSize: limit,
      rows,
      count,
      hasNext: count > page * limit,
    },
  };
};

// TODO
// - Add component for zero or no records found
const Pokemons = ({ rows, page, pageSize, hasNext, count, search }: Props) => {
  const router = useRouter();
  const navigate = useNavigate();

  const listView = useStore((state) => state.listView);
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const next = () => {
    if (!hasNext) return;

    navigate(router.basePath, {
      page: page + 1,
      pageSize,
      types: search?.types,
    });
  };

  const prev = () => {
    if (page <= 1) return;

    navigate(router.basePath, {
      page: page - 1,
      pageSize,
      types: search?.types,
    });
  };

  const filter = (types: string[]) => {
    navigate(router.basePath, {
      page,
      pageSize,
      types,
    });
  };

  React.useEffect(() => setView(listView ? "list" : "grid"), [listView]);

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
 * Attempts to parse query to int
 *
 */
const queryToInt = (subject: ParsedQueryValue) => {
  const scalar = [subject].flat(1).at(0);
  if (scalar && isNumeric(scalar)) return parseInt(scalar);
};

const isNumeric = (value: string) => /\d+/.test(value);

export default Pokemons;
