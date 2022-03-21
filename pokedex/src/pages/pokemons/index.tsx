import {
  Avatar,
  Box,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  LinkBox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { FilterIcon, ViewGridIcon, ViewListIcon } from "@heroicons/react/solid";
import HomepageLayout from "components/layouts/homepage";
import Button from "components/widgets/Button";
import GridTable from "components/widgets/grid-table";
import GridTableCell from "components/widgets/grid-table/GridTableCell";
import GridTableHeading from "components/widgets/grid-table/GridTableHeading";
import GridTableRow from "components/widgets/grid-table/GridTableRow";
import ImageWithFallback from "components/widgets/ImageWithFallback";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS } from "graphql/pokeapi/queries";
import usePagination from "hooks/usePagination";
import useStore from "hooks/useStore";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
import { GetPokemons, GetPokemonsVariables } from "__generated__/GetPokemons";

interface Props {
  pokemons: GetPokemons["pokemons"];
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await apolloClient.query<GetPokemons, GetPokemonsVariables>({
    query: GET_POKEMONS,
    variables: {
      limit: 150,
    },
  });

  return {
    revalidate: 60 * 60 * 24 * 3,
    props: {
      pokemons: data.pokemons,
    },
  };
};

const Pokemons = ({ pokemons }: Props) => {
  const pagination = usePagination(pokemons);

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

            <Toolbar />
          </HStack>

          <Flex
            as="section"
            mt={{ base: 6, lg: 12 }}
            gap={{ base: 4, lg: 8 }}
            direction="column"
          >
            <PokemonList pokemons={pagination.rows} />
            <Pagination {...pagination} />
          </Flex>
        </Box>
      </HomepageLayout>
    </React.Fragment>
  );
};

const Toolbar = () => {
  const toggleListView = useStore((state) => state.toggleListView);
  const handleToggle = (value?: boolean) => () => toggleListView(value);

  return (
    <Wrap spacing={8}>
      <WrapItem>
        <FilterTool />
      </WrapItem>
      <WrapItem>
        <button onClick={handleToggle(true)}>
          <ToolbarIcon icon={ViewListIcon} />
        </button>
      </WrapItem>
      <WrapItem>
        <button onClick={handleToggle(false)}>
          <ToolbarIcon icon={ViewGridIcon} />
        </button>
      </WrapItem>
    </Wrap>
  );
};

interface ToolbarIconProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const ToolbarIcon = ({ icon }: ToolbarIconProps) => {
  return <Icon as={icon} fill="brand.gray.200" fontSize="xl" display="block" />;
};

const FilterTool = () => {
  const items = "Normal|Fire|Water|Grass|Flying|Fighting".split(/\|/);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton>
        <ToolbarIcon icon={FilterIcon} />
      </MenuButton>
      <MenuList color="brand.gray.700" bgColor="white">
        {items.map((item) => (
          <MenuItem key={item} display="flex" justifyContent="space-between">
            <Text>{item}</Text>
            <Checkbox
              colorScheme="colorSchemeHacks.yellow"
              borderColor="brand.gray.400"
              iconColor="brand.primaryDark"
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const PokemonList = (props: Props) => {
  // this causes hydration issue if used directly
  const listView = useStore((state) => state.listView);
  const [isListView, setListView] = React.useState<boolean>();

  React.useEffect(() => {
    setListView(listView);
    return () => setListView(false);
  }, [listView]);

  return !!isListView ? <ListView {...props} /> : <GridView {...props} />;
};

type GridViewProps = Props;

const GridView = ({ pokemons }: GridViewProps) => {
  return (
    <SimpleGrid columns={{ md: 2, lg: 4 }} gap={{ base: 4, lg: 8 }}>
      {pokemons.map((pokemon) => (
        <GridViewItem key={pokemon.id} data={pokemon} />
      ))}
    </SimpleGrid>
  );
};

interface GridViewItemProps {
  data: Props["pokemons"][number];
}

const GridViewItem = ({ data }: GridViewItemProps) => {
  return (
    <Link passHref href={"/pokemons/" + data.id}>
      <LinkBox
        as="a"
        h="260px"
        bgColor="brand.gray.800"
        rounded="sm"
        shadow="md"
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ImageWithFallback
          maxW="80%"
          maxH="80%"
          src={getPokemonImageUrl(data.id)}
          alt=""
          loader={<Spinner size="xl" />}
        />
      </LinkBox>
    </Link>
  );
};

type ListViewProps = Props;

const ListView = ({ pokemons }: ListViewProps) => {
  const router = useRouter();
  const handleClick = (id: number) => () => router.push("/pokemons/" + id);

  return (
    <GridTable columns="49px 75px 1fr 1fr 1fr" bgColor="brand.gray.700">
      <GridTableRow
        px={4}
        py={3}
        borderColor="brand.gray.300"
        borderBottom="1px"
      >
        {"#----Pokemon--Type--Level".split(/--/).map((heading) => (
          <GridTableHeading key={heading}>{heading}</GridTableHeading>
        ))}
      </GridTableRow>

      {pokemons.map(({ id, name, types }) => (
        <GridTableRow
          key={id}
          py={3}
          px={4}
          borderColor="brand.gray.300"
          borderBottom="1px"
          cursor="pointer"
          _hover={{ bgColor: "brand.gray.600" }}
          onClick={handleClick(id)}
        >
          <GridTableCell>{id}</GridTableCell>
          <GridTableCell>
            <Avatar
              w="32px"
              h="32px"
              src={getPokemonImageUrl(id)}
              bgColor="transparent"
            />
          </GridTableCell>
          <GridTableCell>{name}</GridTableCell>
          <GridTableCell>
            {types.map((type) => type.type?.name || "").join()}
          </GridTableCell>
          <GridTableCell>1</GridTableCell>
        </GridTableRow>
      ))}
    </GridTable>
  );
};

type PaginationProps = ReturnType<typeof usePagination>;

const Pagination = ({ prev, next }: PaginationProps) => {
  return (
    <HStack spacing={8} justify="center">
      <HStack spacing={4}>
        <IconButton
          aria-label=""
          icon={<Icon as={ChevronLeftIcon} />}
          bgColor="brand.primary"
          color="brand.gray.800"
          rounded="full"
          shadow="md"
          onClick={prev}
        />

        <IconButton
          aria-label=""
          icon={<Icon as={ChevronRightIcon} />}
          bgColor="brand.primary"
          color="brand.gray.800"
          rounded="full"
          shadow="md"
          onClick={next}
        />
      </HStack>
    </HStack>
  );
};

export default Pokemons;
