import {
  Button,
  Flex,
  FlexProps,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Photo from "components/widgets/Photo";
import apolloClient from "config/apollo/client";
import { GET_POKEMON, GET_POKEMONS } from "graphql/pokeapi/queries";
import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
      limit: 100,
      offset: 0,
      types: await services.pokemons.types.read.all(),
    },
  });

  return {
    fallback: "blocking",
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
    revalidate: 60 * 60 * 24 * 7,
    props: {
      pokemon: result.data.pokemon,
    },
  };
};

const OpenGraph = ({ pokemon }: Props) => {
  const { push } = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") push("/pokemons/" + pokemon.id);
  }, [pokemon.id, push, status]);

  return (
    <>
      <Head>
        <title>Pokedex | {pokemon.name}</title>

        <meta
          property="og:url"
          content="https://internship-project-pokedex.vercel.app"
        />
        <meta property="og:site_name" content="Pokedex" />
        <meta property="fb:app_id" content="1522507158149034" />
        <meta
          property="og:title"
          content={["Pokedex" + pokemon.name].join("|")}
        />
        <meta
          property="og:description"
          content={pokemon.others?.descriptions.at(0)?.description}
        />
        <meta
          property="og:image"
          content={getImageUrlById(pokemon.id, "PNG")}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@calvo__jp" />
        <meta name="twitter:creator" content="@calvo__jp" />
      </Head>

      <Flex minH="100vh" flexDirection="column">
        <Header />

        <Flex
          flexGrow="1"
          align="center"
          justify="center"
          p={4}
          py={8}
          direction="column"
          as="main"
        >
          <Stack
            align="center"
            spacing={{ base: 4, lg: 16 }}
            direction={{ base: "column", lg: "row" }}
          >
            <Thumbnail
              src={getImageUrlById(pokemon.id)}
              fallback={getImageUrlById(pokemon.id, "SVG")}
              bgColor={getColorByType(pokemon.types.at(0)?.type?.name ?? "")}
            />

            <VStack spacing={4} align={{ base: "center", lg: "start" }}>
              <Heading fontSize={{ base: "4xl", lg: "5xl" }}>
                {capitalize(unkebab(pokemon.name))}
              </Heading>

              <Chips
                items={pokemon.types
                  .filter(({ type }) => !!type)
                  // @ts-expect-error
                  .map(({ type }) => type.name)}
              />

              <Text maxW="400px" color="brand.gray.50">
                {pokemon.others?.descriptions.at(0)?.description}
              </Text>
            </VStack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

interface ChipsProps {
  items: string[];
}

const Chips = ({ items }: ChipsProps) => {
  return (
    <HStack>
      {items.map((item) => (
        <Tag key={item} py={2} px={4} rounded="full" bgColor="brand.gray.800">
          {item}
        </Tag>
      ))}
    </HStack>
  );
};

interface ThumbnailProps {
  src: string;
  fallback?: string;
}

const Thumbnail = ({ src, fallback, ...props }: ThumbnailProps & FlexProps) => {
  return (
    <Flex
      w={{ base: "200px", md: "250px", lg: "300px" }}
      h={{ base: "200px", md: "250px", lg: "300px" }}
      align="center"
      justify="center"
      flexShrink={0}
      rounded="full"
      shadow="md"
      {...props}
    >
      <Photo src={src} fallback={fallback} maxH="80%" maxW="80%" />
    </Flex>
  );
};

const Header = () => {
  return (
    <Flex
      as="header"
      p={4}
      bg="brand.gray.800"
      align="center"
      shadow="md"
      justify="space-between"
    >
      <Heading color="brand.primary">Pokedex</Heading>

      <Link href="/login" passHref>
        <Button as="a">Log in</Button>
      </Link>
    </Flex>
  );
};

export default OpenGraph;
