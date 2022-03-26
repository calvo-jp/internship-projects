import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  HStack,
  Icon,
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
import Slideshow from "components/pages/pokemon-details/Slideshow";
import Stats from "components/pages/pokemon-details/Stats";
import Thumbnail from "components/widgets/Thumbnail";
import apolloClient from "config/apollo/client";
import { GET_POKEMON, GET_POKEMONS } from "graphql/pokeapi/queries";
import useNavigate from "hooks/useNavigate";
import useStore from "hooks/useStore";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import services from "services";
import capitalize from "utils/capitalize";
import getColorByType from "utils/pokemons/getColorByType";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import unkebab from "utils/unkebab";
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
      limit: 50,
      offset: 0,
      types: await services.pokemons.types.read.all(),
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
        <Box p={6} pb={20} maxW="container.xl" mx="auto">
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
            mt={14}
            gap={16}
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
      <Box bgColor="brand.gray.800" w="full" rounded="sm">
        <Thumbnail
          h="390px"
          w="325px"
          mx="auto"
          bgColor="transparent"
          src={getImageUrlById(data.id)}
          loader={<Spinner size="xl" />}
        />
      </Box>

      <Slideshow />
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
  const navigate = useNavigate({ scroll: false, shallow: true });

  const handleChange = (index: number) => {
    navigate("/pokemons/" + data.id, { tab: tabs[index] });
  };

  return (
    <Box w={{ xl: "799px" }}>
      <VStack spacing={6} align={{ base: "center", lg: "start" }}>
        <Heading>{unkebab(data.name)}</Heading>
        <HStack>
          {data.types.map(({ type, id }) => {
            if (!type) return null;

            return (
              <Tag
                py={2}
                px={4}
                key={id}
                color="brand.gray.50"
                bgColor={getColorByType(type.name, { mode: "dark" })}
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
        w="full"
      >
        <TabList gap={4} flexWrap="wrap" justifyContent={{ lg: "start" }}>
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

        <TabPanels mt={14} w="full">
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
