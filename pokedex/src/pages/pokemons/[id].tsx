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
import GridTable from "components/widgets/grid-table";
import GridTableCell from "components/widgets/grid-table/GridTableCell";
import GridTableHeading from "components/widgets/grid-table/GridTableHeading";
import GridTableRow from "components/widgets/grid-table/GridTableRow";
import IconButton from "components/widgets/IconButton";
import ImageWithFallback from "components/widgets/ImageWithFallback";
import Thumbnail from "components/widgets/thumbnail";
import apolloClient from "config/apollo/client";
import {
  GET_POKEMON,
  GET_POKEMONS,
  GET_POKEMON_EVOLUTION,
} from "graphql/pokeapi/queries";
import useStore from "hooks/useStore";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { default as Link, default as NextLink } from "next/link";
import * as React from "react";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
import randomIdGenerator from "utils/randomIdGenerator";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";
import {
  GetPokemonEvolution,
  GetPokemonEvolutionVariables,
} from "__generated__/GetPokemonEvolution";
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

interface Props {
  pokemon: NonNullable<GetPokemon["pokemon"]>;
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
  data: NonNullable<GetPokemon["pokemon"]>;
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

const RecentlyOpened = () => {
  const pokemonIds = useStore((state) => state.viewedPokemonIds);

  return (
    <HStack spacing={5}>
      <IconButton icon={ChevronLeftIcon} />

      <SimpleGrid columns={3} columnGap={2} rowGap={4}>
        {pokemonIds.map((id) => (
          <Link passHref href={"/pokemons/" + id} key={id}>
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
        ))}
      </SimpleGrid>

      <IconButton icon={ChevronRightIcon} active />
    </HStack>
  );
};

interface RightPaneProps {
  data: NonNullable<GetPokemon["pokemon"]>;
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
                key={id}
                color="brand.gray.50"
                bgColor="brand.red.500"
                rounded="full"
                py={2}
                px={4}
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
            <Statistics />
          </TabPanel>
          <TabPanel p={0}>
            <Evolution data={data} />
          </TabPanel>
          <TabPanel p={0}>
            <Moves />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

interface AboutProps {
  data: NonNullable<GetPokemon["pokemon"]>;
}

const About = ({ data }: AboutProps) => {
  return (
    <VStack spacing={8} align="start">
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin
        mauris tempus consectetur arcu maecenas id mauris pretium. Integer
        laoreet morbi cursus consectetur. Ipsum turpis id quisque morbi est in
        id nibh sagittis. Ipsum ornare quam vitae praesent.
      </Text>

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
            ["Gender", "87.8% Male"],
            ["Egg Group", "Monster"],
            ["Egg Cycle", "Grass"],
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

const Statistics = () => {
  const stats = [
    { label: "HP", value: 20, colorScheme: "colorSchemeHacks.rose" },
    { label: "ATK", value: 30, colorScheme: "colorSchemeHacks.amber" },
    { label: "DEF", value: 40, colorScheme: "colorSchemeHacks.teal" },
    { label: "SPD", value: 12, colorScheme: "colorSchemeHacks.purple" },
    { label: "EXP", value: 90, colorScheme: "colorSchemeHacks.gray" },
  ];

  return (
    <VStack spacing={16} align="start">
      <Card w="full">
        {stats.map(({ label, value, colorScheme }) => (
          <Flex align="center" fontWeight="medium" key={label}>
            <Text w="45px">{label}</Text>

            <Progress
              ml={8}
              mr={4}
              size="xs"
              colorScheme={colorScheme}
              bgColor="brand.gray.200"
              flexGrow="1"
              value={value}
            />

            <Text w="35px">{value}%</Text>
          </Flex>
        ))}
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

interface EvolutionProps {
  data: NonNullable<GetPokemon["pokemon"]>;
}

const Evolution = (props: EvolutionProps) => {
  const { loading, data, refetch } = useQuery<
    GetPokemonEvolution,
    GetPokemonEvolutionVariables
  >(GET_POKEMON_EVOLUTION, {
    variables: { id: props.data.id },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return null;
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
                      item.evolvesFromSpeciesId || props.data.id
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

                  <Text>25</Text>
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

const Moves = () => {
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
