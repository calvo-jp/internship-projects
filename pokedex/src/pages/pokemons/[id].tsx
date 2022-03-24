import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Icon,
  Skeleton,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import HomepageLayout from "components/layouts/homepage";
import About from "components/pages/pokemon-details/About";
import Evolution from "components/pages/pokemon-details/Evolution";
import Moves from "components/pages/pokemon-details/Moves";
import RecentlyViewed from "components/pages/pokemon-details/RecentlyViewed";
import Stats from "components/pages/pokemon-details/Stats";
import Thumbnail from "components/widgets/Thumbnail";
import apolloClient from "config/apollo/client";
import { GET_POKEMON, GET_POKEMONS } from "graphql/pokeapi/queries";
import useStore from "hooks/useStore";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import capitalize from "utils/capitalize";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";
import { GetPokemons, GetPokemonsVariables } from "__generated__/GetPokemons";

interface Params {
  id: string;
  [key: string]: any;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const result = await apolloClient.query<GetPokemons, GetPokemonsVariables>({
    query: GET_POKEMONS,
    variables: {
      limit: 100,
      offset: 0,
    },
  });

  return {
    fallback: true,
    paths: result.data.pokemons.map(({ id }) => ({
      params: { id: id.toString() },
    })),
  };
};

type TPokemon = NonNullable<GetPokemon["pokemon"]>;

interface Props {
  pokemon: TPokemon;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const id = params!.id;

  const result = await apolloClient.query<GetPokemon, GetPokemonVariables>({
    query: GET_POKEMON,
    variables: { id: parseInt(id) },
  });

  if (!result.data.pokemon) return { notFound: true };

  return {
    revalidate: 60 * 60 * 24 * 3,
    props: {
      pokemon: result.data.pokemon,
    },
  };
};

const Pokemon = ({ pokemon }: Props) => {
  const saveAsViewedPokemon = useStore((state) => state.saveAsViewedPokemon);
  const router = useRouter();

  React.useEffect(() => {
    if (pokemon) saveAsViewedPokemon(pokemon.id);
  }, [pokemon, saveAsViewedPokemon]);

  if (router.isFallback) return <Loader />;

  return (
    <React.Fragment>
      <Head>
        <title>Pokedex | {pokemon.name}</title>
      </Head>

      <HomepageLayout>
        <Box w="fit-content" mx="auto" p={6} pb={20}>
          <Breadcrumb
            as="section"
            fontSize="sm"
            spacing={3}
            separator={<Icon stroke="brand.gray.400" as={ChevronRightIcon} />}
          >
            <BreadcrumbItem color="brand.gray.500">
              <Link href="/pokemons" passHref>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem color="brand.gray.50" isCurrentPage>
              <BreadcrumbLink>Pokemon details</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex
            as="section"
            gap={16}
            mt={14}
            direction={{ base: "column", lg: "row" }}
          >
            <LeftPane data={pokemon} />
            <RightPane data={pokemon} />
          </Flex>
        </Box>
      </HomepageLayout>
    </React.Fragment>
  );
};

const Loader = () => {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Spinner w="75px" h="75px" thickness="4px" />
    </Flex>
  );
};

interface LeftPaneProps {
  data: TPokemon;
}

const LeftPane = ({ data }: LeftPaneProps) => {
  return (
    <VStack spacing={12}>
      <Thumbnail
        h="390px"
        w="325px"
        bgColor="brand.gray.800"
        src={getPokemonImageUrl(data.id)}
        loader={<Spinner size="xl" />}
      />

      <RecentlyViewed />
    </VStack>
  );
};

interface RightPaneProps {
  data: TPokemon;
}

const tabs = "about|statistics|evolution|moves".split(/\|/);

const RightPane = ({ data }: RightPaneProps) => {
  const router = useRouter();
  const currentTab = [router.query.tab].flat(1).at(0) || tabs[0];
  const currentTabIdx = tabs.findIndex((tab) => tab === currentTab);

  const handleChange = (index: number) => {
    router.push(`/pokemons/${data.id}?tab=${tabs[index]}`, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  return (
    <Box w={{ xl: "799px", base: "auto" }}>
      <VStack spacing={6} align={{ base: "center", lg: "start" }}>
        <Heading>{data.name}</Heading>
        <HStack>
          {data.types.map(({ type, id }) => {
            if (!type) return null;

            return (
              <Tag
                py={2}
                px={4}
                key={id}
                color="brand.gray.50"
                bgColor="brand.red.500"
                rounded="full"
              >
                {type.name}
              </Tag>
            );
          })}
        </HStack>
      </VStack>

      <Tabs
        mt={16}
        isLazy
        variant="unstyled"
        onChange={handleChange}
        index={currentTabIdx}
        lazyBehavior="keepMounted"
      >
        <TabList
          gap={4}
          flexWrap="wrap"
          justifyContent={{ base: "center", lg: "start" }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              fontWeight="medium"
              bgColor="brand.gray.800"
              color="brand.gray.50"
              rounded="sm"
              w={{ base: "full", lg: "187px" }}
              _selected={{
                color: "brand.gray.800",
                bgColor: "brand.primary",
              }}
            >
              {capitalize(tab)}
            </Tab>
          ))}
        </TabList>

        <TabPanels mt={14}>
          <TabPanel p={0}>
            <About data={data} />
          </TabPanel>
          <TabPanel p={0}>
            <Stats id={data.id} />
          </TabPanel>
          <TabPanel p={0}>
            <Evolution id={data.id} />
          </TabPanel>
          <TabPanel p={0}>
            <Moves id={data.id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Pokemon;
