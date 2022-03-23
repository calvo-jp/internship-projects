import { useQuery } from "@apollo/client";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  ArrowNarrowRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import HomepageLayout from "components/layouts/homepage";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import CardTag from "components/widgets/card/CardTag";
import GridTable from "components/widgets/gridTable";
import GridTableCell from "components/widgets/gridTable/GridTableCell";
import GridTableHeading from "components/widgets/gridTable/GridTableHeading";
import GridTableRow from "components/widgets/gridTable/GridTableRow";
import IconButton from "components/widgets/IconButton";
import ImageWithFallback from "components/widgets/ImageWithFallback";
import Thumbnail from "components/widgets/thumbnail";
import apolloClient from "config/apollo/client";
import {
  GET_POKEMON,
  GET_POKEMONS,
  GET_POKEMON_EVOLUTION,
  GET_POKEMON_MOVES,
  GET_POKEMON_STATS,
} from "graphql/pokeapi/queries";
import useSlideshow from "hooks/useSlideshow";
import useStore from "hooks/useStore";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { default as Link, default as NextLink } from "next/link";
import * as React from "react";
import arrayChunk from "utils/arrayChunk";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
import randomIdGenerator from "utils/randomIdGenerator";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";
import {
  GetPokemonEvolution,
  GetPokemonEvolutionVariables,
} from "__generated__/GetPokemonEvolution";
import {
  GetPokemonMoves,
  GetPokemonMovesVariables,
} from "__generated__/GetPokemonMoves";
import { GetPokemons, GetPokemonsVariables } from "__generated__/GetPokemons";
import {
  GetPokemonStats,
  GetPokemonStatsVariables,
} from "__generated__/GetPokemonStats";

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

interface IWithPokemonId {
  id: TPokemon["id"];
}

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

  React.useEffect(() => {
    saveAsViewedPokemon(pokemon.id);
  }, [pokemon.id, saveAsViewedPokemon]);

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
              <NextLink href="/pokemons" passHref>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </NextLink>
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

interface LeftPaneProps {
  data: TPokemon;
}

const LeftPane = ({ data }: LeftPaneProps) => {
  return (
    <VStack spacing={12}>
      <Flex
        h="390px"
        w="325px"
        rounded="md"
        bgColor="brand.gray.800"
        align="center"
        justify="center"
        shadow="md"
      >
        <ImageWithFallback
          maxW="80%"
          maxH="80%"
          alt=""
          src={getPokemonImageUrl(data.id)}
          loader={<Skeleton h="full" w="full" />}
        />
      </Flex>

      <RecentlyOpened />
    </VStack>
  );
};

interface RecentlyOpenedProps {
  exclude?: number[];
}

const RecentlyOpened = ({ exclude }: RecentlyOpenedProps) => {
  const items = useStore((state) => state.viewedPokemonIds);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const { slides, currentSlide, next, prev } = useSlideshow(items);

  const slide = React.useCallback(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const width = slider.offsetWidth;

    slider.scrollLeft = width * (currentSlide - 1);
  }, [currentSlide]);

  React.useEffect(() => {
    slide();
    const id = setTimeout(next, 5000);
    return () => clearTimeout(id);
  }, [next, slide]);

  return (
    <HStack spacing={5}>
      <IconButton icon={ChevronLeftIcon} onClick={prev} />

      <Flex
        ref={sliderRef}
        overflowX="hidden"
        scrollBehavior="smooth"
        w="187px"
      >
        {slides.map((ids) => (
          <SimpleGrid
            key={generateId()}
            rowGap={4}
            columns={3}
            columnGap={2}
            flexShrink={0}
          >
            {ids.map((id) => (
              <RecentlyOpenedItem key={id} id={id} />
            ))}
          </SimpleGrid>
        ))}
      </Flex>

      <IconButton icon={ChevronRightIcon} onClick={next} />
    </HStack>
  );
};

const RecentlyOpenedItem = ({ id }: IWithPokemonId) => {
  return (
    <Link passHref href={"/pokemons/" + id}>
      <Flex
        as="a"
        w="57px"
        h="57px"
        rounded="sm"
        bgColor="brand.gray.800"
        align="center"
        justify="center"
        p={2}
      >
        <ImageWithFallback
          maxW="80%"
          maxH="80%"
          src={getPokemonImageUrl(id)}
          alt=""
        />
      </Flex>
    </Link>
  );
};

interface RightPaneProps {
  data: TPokemon;
}

const RightPane = ({ data }: RightPaneProps) => {
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

      <Tabs mt={16} variant="unstyled">
        <TabList gap={4} flexWrap="wrap">
          {["About", "Statistics", "Evolution", "Moves"].map((tab) => (
            <Tab
              key={tab}
              fontWeight="medium"
              bgColor="brand.gray.800"
              color="brand.gray.50"
              rounded="sm"
              w="187px"
              _selected={{
                color: "brand.gray.800",
                bgColor: "brand.primary",
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels mt={14}>
          <TabPanel p={0}>
            <About data={data} />
          </TabPanel>
          <TabPanel p={0}>
            <Statistics id={data.id} />
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

interface AboutProps {
  data: TPokemon;
}

const About = ({ data }: AboutProps) => {
  return (
    <VStack spacing={8} align="start">
      <Text>{data.others?.descriptions.at(0)?.description}</Text>

      <Card py={4} bgColor="others.gray.800">
        <HStack
          gap={6}
          divider={
            <Divider
              h="75px"
              orientation="vertical"
              borderColor="brand.gray.700"
            />
          }
        >
          {[
            ["Weight", data.weight],
            ["Height", data.height],
          ].map(([label, value]) => (
            <VStack key={label} spacing={2} align="start">
              <CardHeading>{label}</CardHeading>

              <Text color="brand.gray.50">{value} KG</Text>
            </VStack>
          ))}
        </HStack>
      </Card>

      <Card bgColor="others.gray.800">
        <CardHeading>Breed</CardHeading>

        <Wrap mt={3} spacing={8}>
          {[
            ["Gender", getGender(data.specy?.genderRate)],
            ["Egg Group", getEggGroups(data.specy?.eggGroups)],
            ["Egg Cycle", data.specy?.eggCycyle || 0],
          ].map(([label, value]) => (
            <WrapItem key={label}>
              <Text color="brand.gray.400">{label}:</Text>
              <Text color="brand.gray.50" ml={2}>
                {value}
              </Text>
            </WrapItem>
          ))}
        </Wrap>
      </Card>
    </VStack>
  );
};

type EggGroup = NonNullable<TPokemon["specy"]>["eggGroups"] | null | undefined;

const getEggGroups = (eggGroups: EggGroup) => {
  return !eggGroups
    ? "NA"
    : eggGroups
        .map(({ eggGroup }) => eggGroup?.name)
        .filter((value) => !!value)
        .join(", ");
};

const getGender = (genderRate: null | number | undefined) => {
  return !genderRate || genderRate <= 0
    ? "genderless"
    : genderRate >= 8
    ? genderRate * 10 + "% female"
    : genderRate * 10 + "% male";
};

type StatsLegendKey =
  | "hp"
  | "speed"
  | "experience"
  | "special-attack"
  | "special-defense";

interface StatsLegendValue {
  label: string;
  color: string;
}

const statsLegend: Record<StatsLegendKey, StatsLegendValue> = {
  hp: { label: "HP", color: "colorSchemeHacks.rose" },
  speed: { label: "SPD", color: "colorSchemeHacks.purple" },
  experience: { label: "EXP", color: "colorSchemeHacks.gray" },
  "special-attack": { label: "ATK", color: "colorSchemeHacks.amber" },
  "special-defense": { label: "DEF", color: "colorSchemeHacks.teal" },
};

const Statistics = ({ id }: IWithPokemonId) => {
  const { loading, data, refetch } = useQuery<
    GetPokemonStats,
    GetPokemonStatsVariables
  >(GET_POKEMON_STATS, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  // TODO: add loader
  if (loading) return null;

  // TODO: add error and refetch option
  if (!data?.pokemon) return null;

  const stats = [
    ...data.pokemon.stats.map(({ stat, id, value }) => {
      if (stat && stat.name in statsLegend) {
        return {
          id,
          value,
          ...statsLegend[stat.name as StatsLegendKey],
        };
      }
    }),
    {
      id,
      value: data.pokemon.experience || 0,
      ...statsLegend["experience"],
    },
  ];

  return (
    <VStack spacing={16} align="start">
      <Card w="full">
        {stats.map((stat) => {
          if (!stat) return null;

          return (
            <Flex align="center" fontWeight="medium" key={stat.id}>
              <Text w="45px">{stat.label}</Text>
              <Progress
                ml={8}
                mr={4}
                size="xs"
                colorScheme={stat.color}
                bgColor="brand.gray.200"
                flexGrow="1"
                value={stat.value}
              />
              <Text w="45px">{stat.value}%</Text>
            </Flex>
          );
        })}
      </Card>

      <Card w="full" bgColor="others.gray.800">
        <CardHeading>Weaknesses</CardHeading>

        <Flex mt={6} wrap="wrap" rowGap={4} columnGap={8}>
          {["Rock", "Ground", "Water"].map((weakness) => (
            <HStack spacing={6} key={weakness}>
              <CardTag variant="error">{weakness}</CardTag>

              <Text>
                <Box as="span" color="brand.red.500" mr={1}>
                  160%
                </Box>
                <span>damage</span>
              </Text>
            </HStack>
          ))}
        </Flex>
      </Card>

      <Card w="full" bgColor="others.gray.800">
        <CardHeading>Resistant</CardHeading>

        <Flex mt={6} wrap="wrap" rowGap={4} columnGap={8}>
          {Array(6)
            .fill(null)
            .map((_, idx) => (
              <HStack spacing={6} key={idx}>
                <CardTag variant="success">Bug</CardTag>

                <Text>
                  <Box as="span" color="brand.green.500" mr={1}>
                    65%
                  </Box>
                  <span>damage</span>
                </Text>
              </HStack>
            ))}
        </Flex>

        <Flex mt={5} justify="right">
          <Button
            p={0}
            m={0}
            h="fit-content"
            bgColor="transparent"
            rightIcon={<Icon as={ChevronDownIcon} />}
            fontWeight="normal"
            fontSize="sm"
            color="brand.primary"
          >
            See more
          </Button>
        </Flex>
      </Card>
    </VStack>
  );
};

const Evolution = ({ id }: IWithPokemonId) => {
  const { loading, data, refetch } = useQuery<
    GetPokemonEvolution,
    GetPokemonEvolutionVariables
  >(GET_POKEMON_EVOLUTION, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  // TODO: add loader
  if (loading) return null;

  // TODO: show error and option for refetch
  if (!data?.pokemon) return null;

  return (
    <Box>
      <Text maxW="403px" fontSize="sm">
        There are currently a total of 9 Pokémon in the Eevee family. Flareon
        evolves from Eevee which costs{" "}
        <Text as="b" fontWeight="semibold">
          25 Candy.
        </Text>
      </Text>

      <Card mt={4} w="full">
        <VStack spacing={6}>
          {data.pokemon.specy?.evolutionChain?.evolutions.map((item) => (
            <Center key={item.id}>
              <HStack spacing={{ base: 12, md: 24, lg: 44 }}>
                <VStack spacing={2}>
                  <Thumbnail
                    w="88px"
                    h="88px"
                    src={getPokemonImageUrl(
                      item.evolvesFromSpeciesId || item.id
                    )}
                  />

                  <Text fontSize="sm">{item.name}</Text>
                </VStack>

                <Box>
                  <Icon
                    as={ArrowNarrowRightIcon}
                    stroke="brand.primary"
                    fontSize="2xl"
                  />

                  <Text>{item.evolvesWhen.at(0)?.level || 0}</Text>
                </Box>

                <VStack spacing={2}>
                  <Thumbnail
                    w="88px"
                    h="88px"
                    src={getPokemonImageUrl(item.id)}
                  />

                  <Text fontSize="sm">{item.name}</Text>
                </VStack>
              </HStack>
            </Center>
          ))}
        </VStack>
      </Card>
    </Box>
  );
};

const Moves = ({ id }: IWithPokemonId) => {
  const { loading, data, refetch } = useQuery<
    GetPokemonMoves,
    GetPokemonMovesVariables
  >(GET_POKEMON_MOVES, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <VStack spacing={8}>
      <Card w="full">
        <SimpleGrid columns={2}>
          <MovesTags
            heading="Quick Moves"
            items={"Ember|Fire Spin".split(/\|/)}
          />

          <MovesTable
            headings={"Damage|DPS|EPS".split(/\|/)}
            data={[
              [10, 10, 10],
              [14, 9.1, 6.4],
            ]}
          />
        </SimpleGrid>
      </Card>

      <Card w="full">
        <SimpleGrid columns={2}>
          <MovesTags
            heading="Main Moves"
            items={"Fireblast|Flame Thrower|Heat wave|Overheat".split(/\|/)}
          />

          <MovesTable
            headings={"Damage|DPS|EPS".split(/\|/)}
            data={[
              [10, 10, 10],
              [14, 9.1, 6.4],
              [12, 6.5, 8],
              [13, 3, 8],
            ]}
          />
        </SimpleGrid>
      </Card>
    </VStack>
  );
};

interface MovesTagsProps {
  heading: string;
  items: string[];
}

const MovesTags = ({ heading, items }: MovesTagsProps) => {
  return (
    <VStack spacing={6} align="start">
      <CardHeading>{heading}</CardHeading>

      {items.map((tag) => (
        <CardTag variant="info" key={generateId()}>
          {tag}
        </CardTag>
      ))}
    </VStack>
  );
};

interface MovesTableProps {
  headings: string[];
  /** should match the number of headings */
  data: (string | number)[][];
}

const MovesTable = ({ headings, data, ...props }: MovesTableProps) => {
  const length = headings.length;

  return (
    <GridTable columns={`repeat(${length}, 1fr)`} {...props}>
      <GridTableRow p={2} borderBottom="1px">
        {headings.map((heading) => (
          <GridTableHeading textAlign="center" key={heading}>
            {heading}
          </GridTableHeading>
        ))}
      </GridTableRow>

      {data.map((cells) => (
        <GridTableRow key={generateId()} p={4} borderBottom="1px">
          {cells.map((cell) => (
            <GridTableCell key={generateId()} textAlign="center">
              {cell}
            </GridTableCell>
          ))}
        </GridTableRow>
      ))}
    </GridTable>
  );
};

const generateId = randomIdGenerator();
export default Pokemon;
