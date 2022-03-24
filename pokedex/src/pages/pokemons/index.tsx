import {
  Box,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
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
import GridTable from "components/widgets/gridTable";
import GridTableCell from "components/widgets/gridTable/GridTableCell";
import GridTableHeading from "components/widgets/gridTable/GridTableHeading";
import GridTableRow from "components/widgets/gridTable/GridTableRow";
import Thumbnail from "components/widgets/Thumbnail";
import apolloClient from "config/apollo/client";
import { GET_POKEMONS, GET_POKEMONS_BY_TYPES } from "graphql/pokeapi/queries";
import useStore from "hooks/useStore";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import coalesce from "utils/coalesce";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
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
    types?: string[] | null;
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
  const types = query.type ? [query.type].flat(1) : [];

  if (types.length > 0) {
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
  console.log(search);
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
    if (hasNext) redirect({ page: page + 1, pageSize, type: search?.types });
  };

  const prev = () => {
    if (page > 1) redirect({ page: page + 1, pageSize, type: search?.types });
  };

  const filter = (values: string[]) => {
    redirect({ page, pageSize, type: values });
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
            {view === "list" && <ListView rows={rows} />}
            {view === "grid" && <GridView rows={rows} />}

            <PageControls onNext={next} onPrev={prev} />
          </Flex>
        </Box>
      </HomepageLayout>
    </React.Fragment>
  );
};

interface FilterToolProps {
  value?: string[] | null;
  onChange: (filters: string[]) => void;
}

const FilterTool = ({ value, onChange }: FilterToolProps) => {
  const [selected, setSelected] = React.useState<string[]>(value || []);
  const categories = React.useMemo(() => POKEMON_TYPES, []);

  const handleChange = (newValue: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        if (selected.includes(newValue)) return;
        return setSelected((old) => [...old, newValue]);
      }

      if (!selected.includes(newValue)) return;
      setSelected((old) => old.filter((item) => item !== newValue));
    };
  };

  // React.useEffect(() => {
  //   onChange(selected);
  // }, [onChange, selected]);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton>
        <ToolbarIcon icon={FilterIcon} />
      </MenuButton>
      <MenuList color="brand.gray.700" bgColor="white">
        {categories.map((item) => (
          <MenuItem key={item} display="flex" justifyContent="space-between">
            <Text>{item}</Text>
            <Checkbox
              colorScheme="colorSchemeHacks.yellow"
              borderColor="brand.gray.400"
              iconColor="brand.primaryDark"
              onChange={handleChange(item)}
              checked={selected.includes(item)}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
interface ToolbarProps {
  filters?: string[] | null;
  onFilter: (values: string[]) => void;
}

const Toolbar = ({ filters, onFilter }: ToolbarProps) => {
  const toggleListView = useStore((state) => state.toggleListView);
  const handleToggle = (value?: boolean) => () => toggleListView(value);

  return (
    <Wrap spacing={8}>
      <WrapItem>
        <FilterTool value={filters} onChange={onFilter} />
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

interface GridViewProps {
  rows: Pokemon[];
}

const GridView = ({ rows }: GridViewProps) => {
  return (
    <SimpleGrid columns={{ md: 2, lg: 4 }} gap={{ base: 4, lg: 8 }}>
      {rows.map((pokemon) => (
        <GridViewItem key={pokemon.id} data={pokemon} />
      ))}
    </SimpleGrid>
  );
};

interface GridViewItemProps {
  data: Pokemon;
}

const GridViewItem = ({ data }: GridViewItemProps) => {
  return (
    <Link href={"/pokemons/" + data.id} passHref>
      <Thumbnail
        as="a"
        h="260px"
        src={getPokemonImageUrl(data.id)}
        loader={<Spinner size="xl" />}
      />
    </Link>
  );
};

type ListViewProps = GridViewProps;

const ListView = ({ rows }: ListViewProps) => {
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
        {"#||Pokemon|Type|Level".split(/\|/).map((heading) => (
          <GridTableHeading key={heading}>{heading}</GridTableHeading>
        ))}
      </GridTableRow>

      {rows.map(({ id, name, types }) => (
        <GridTableRow
          key={id}
          py={3}
          px={4}
          borderColor="brand.gray.300"
          borderBottom="1px"
          cursor="pointer"
          _hover={{ bgColor: "brand.gray.600" }}
          _focus={{ bgColor: "brand.gray.600", outline: "none" }}
          onClick={handleClick(id)}
          tabIndex={1}
        >
          <GridTableCell>{id}</GridTableCell>
          <GridTableCell>
            <Thumbnail
              w="32px"
              h="32px"
              src={getPokemonImageUrl(id)}
              bgColor="transparent"
              shadow="none"
              loader={<Spinner size="md" />}
            />
          </GridTableCell>
          <GridTableCell>{name}</GridTableCell>
          <GridTableCell>
            {types.map((type) => type.type?.name || "").join(", ")}
          </GridTableCell>
          <GridTableCell>Lvl 1</GridTableCell>
        </GridTableRow>
      ))}
    </GridTable>
  );
};

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
}

const PageControls = ({ onNext, onPrev }: PaginationProps) => {
  return (
    <HStack spacing={8} justify="center">
      <HStack spacing={4}>
        <Control control="previous" onClick={onPrev} />
        <Control control="next" onClick={onNext} />
      </HStack>
    </HStack>
  );
};

interface ControlProps extends React.ComponentProps<"button"> {
  control: "next" | "previous";
}

const Control = ({ control, ...props }: ControlProps) => {
  return (
    <IconButton
      aria-label={control}
      icon={
        <Icon as={control === "next" ? ChevronRightIcon : ChevronLeftIcon} />
      }
      bgColor="brand.primary"
      color="brand.gray.800"
      rounded="full"
      shadow="md"
      _hover={{
        bgColor: "brand.primary",
        color: "brand.gray.800",
      }}
      _active={{
        bgColor: "brand.primary",
        color: "brand.gray.800",
      }}
      {...props}
    />
  );
};

const POKEMON_TYPES = "Normal|Fire|Water|Grass|Flying|Fighting"
  .split(/\|/)
  .map((str) => str.toLowerCase());

export default Pokemons;
