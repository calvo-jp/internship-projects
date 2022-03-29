import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/outline";
import HomepageLayout from "components/layouts/homepage";
import LeftPane from "components/pages/pokemon-details/LeftPane";
import RightPane from "components/pages/pokemon-details/RightPane";
import apolloClient from "config/apollo/client";
import { GET_POKEMON, GET_POKEMONS } from "graphql/pokeapi/queries";
import useStore from "hooks/useStore";
import useTabQuery from "hooks/useTabQuery";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import services from "services";
import capitalize from "utils/capitalize";
import getImageUrlById from "utils/pokemons/getImageUrlById";
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
  const id = params ? parseInt(params.id) : NaN;

  if (Number.isNaN(id)) return { notFound: true };

  const result = await apolloClient.query<GetPokemon, GetPokemonVariables>({
    query: GET_POKEMON,
    variables: { id },
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
  const router = useRouter();
  const saveAsViewedPokemon = useStore((state) => state.saveAsViewedPokemon);

  useEffect(() => {
    if (pokemon) saveAsViewedPokemon(pokemon.id);
  }, [pokemon, saveAsViewedPokemon]);

  if (router.isFallback) return <Loader />;

  return (
    <>
      <Head>
        <title>Pokedex | {pokemon.name}</title>

        <meta
          property="og:url"
          content={
            "https://internship-project-pokedex.vercel.app/pokemons/" +
            pokemon.id
          }
        />
        <meta property="og:site_name" content="Pokedex" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={"Pokedex | " + pokemon.name} />
        <meta
          property="og:description"
          content={pokemon.others?.descriptions.at(0)?.description}
        />
        <meta property="og:image" content={getImageUrlById(pokemon.id)} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@calvo__jp" />
        <meta name="twitter:creator" content="@calvo__jp" />
      </Head>

      <HomepageLayout>
        <Box p={6} pb={16} maxW="container.xl" mx="auto">
          <Menu />

          <Flex
            as="section"
            mt={14}
            gap={16}
            direction={{ base: "column", lg: "row" }}
          >
            <Box flexGrow={{ xl: 1 }}>
              <LeftPane data={pokemon} />
            </Box>
            <Box w={{ xl: "799px" }} flexShrink={{ xl: 0 }}>
              <RightPane data={pokemon} />
            </Box>
          </Flex>
        </Box>
      </HomepageLayout>
    </>
  );
};

const Menu = () => {
  const currentTab = useTabQuery();

  return (
    <Breadcrumb
      as="section"
      fontSize="sm"
      spacing={3}
      separator={<Icon stroke="brand.gray.400" as={ChevronRightIcon} />}
      color="brand.gray.500"
    >
      <BreadcrumbItem>
        <Link href="/pokemons" passHref>
          <BreadcrumbLink>Home</BreadcrumbLink>
        </Link>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>Pokemon details</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem color="brand.gray.50" isCurrentPage>
        <BreadcrumbLink>{capitalize(currentTab)}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

const Loader = () => {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Spinner w="75px" h="75px" thickness="4px" />
    </Flex>
  );
};

export default Pokemon;
