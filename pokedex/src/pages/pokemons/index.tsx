import { Box, Flex, Heading, HStack } from "@chakra-ui/react";
import HomepageLayout from "components/layouts/homepage";
import GridView from "components/pages/pokemon-list/GridView";
import ListView from "components/pages/pokemon-list/ListView";
import Pagination from "components/pages/pokemon-list/Pagination";
import Toolbar from "components/pages/pokemon-list/Toolbar";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS, GET_POKEMONS_BY_TYPES } from "graphql/pokeapi/queries";
import useStore from "hooks/useStore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import coalesce from "utils/coalesce";
import routerQueryValueToIntOrUndefined from "utils/routerQueryToIntOrUndefined";
import { GetPokemons, GetPokemonsVariables } from "__generated__/GetPokemons";
import {
  GetPokemonsByTypes,
  GetPokemonsByTypesVariables,
} from "__generated__/GetPokemonsByTypes";

type Pokemon = GetPokemons["pokemons"][number];

interface Props {
  rows: Pokemon[];
  page: number;
  pageSize: number;
  hasNext: boolean;
  search?: {
    types?: string[];
  };
}

// NEEDS REFACTORING!!
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const page = coalesce(routerQueryValueToIntOrUndefined(query.page), 1);
  const limit = coalesce(routerQueryValueToIntOrUndefined(query.pageSize), 20);
  const offset = (page - 1) * limit;
  const hasNext = true;

  const types = [query.types]
    .flat()
    .at(0)
    ?.split(/\,/g)
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value.length > 0);

  if (types && types.length > 0) {
    const { data } = await apolloClient.query<
      GetPokemonsByTypes,
      GetPokemonsByTypesVariables
    >({
      query: GET_POKEMONS_BY_TYPES,
      variables: {
        limit,
        offset,
        types,
      },
    });

    if (data.pokemons.length <= 0) return { notFound: true };

    return {
      props: {
        page,
        pageSize: limit,
        rows: data.pokemons,
        hasNext,
        search: {
          types,
        },
      },
    };
  }

  const { data } = await apolloClient.query<GetPokemons, GetPokemonsVariables>({
    query: GET_POKEMONS,
    variables: {
      limit,
      offset,
    },
  });

  if (data.pokemons.length <= 0) return { notFound: true };

  return {
    props: {
      page,
      pageSize: limit,
      rows: data.pokemons,
      hasNext,
    },
  };
};

const Pokemons = ({ rows, page, pageSize, hasNext, search }: Props) => {
  const router = useRouter();

  const listView = useStore((state) => state.listView);
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const redirect = (queries: Record<string, any>) => {
    const searchParams = new URLSearchParams(queries);

    router.push(`${router.basePath}?${searchParams.toString()}`, undefined, {
      // run getServerSide always
      shallow: false,
    });
  };

  const next = () => {
    if (!hasNext) return;

    redirect({
      page: page + 1,
      pageSize,
      type: search?.types,
    });
  };

  const prev = () => {
    if (page <= 1) return;

    redirect({
      page: page - 1,
      pageSize,
      type: search?.types,
    });
  };

  const filter = (types: string[]) => {
    redirect({
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

export default Pokemons;
