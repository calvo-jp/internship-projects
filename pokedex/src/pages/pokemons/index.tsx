import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { FilterIcon, ViewGridIcon, ViewListIcon } from "@heroicons/react/solid";
import HomepageLayout from "components/layouts/homepage";
import GridTable from "components/widgets/grid-table";
import GridTableCell from "components/widgets/grid-table/GridTableCell";
import GridTableHeading from "components/widgets/grid-table/GridTableHeading";
import GridTableRow from "components/widgets/grid-table/GridTableRow";
import useStore from "hooks/useStore";
import Head from "next/head";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const Pokemons = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pokedex</title>
      </Head>

      <HomepageLayout>
        <Box p={{ base: 4, md: 8, lg: 12 }} maxW="container.lg" mx="auto">
          <Section1 />

          <Flex
            as="section"
            mt={{ base: 6, lg: 12 }}
            gap={{ base: 2, lg: 4 }}
            direction="column"
          >
            <PokemonList />
            <Pagination />
          </Flex>
        </Box>
      </HomepageLayout>
    </React.Fragment>
  );
};

const Section1 = () => {
  return (
    <HStack justify="space-between" as="section">
      <Heading fontSize="2xl" color="brand.gray.100" fontWeight="semibold">
        Choose Pokemon
      </Heading>

      <Toolbar />
    </HStack>
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
      <MenuList color="brand.gray.700" ml={-5}>
        {items.map((item) => (
          <MenuItem key={item} display="flex" justifyContent="space-between">
            <Text fontSize="sm">{item}</Text>
            <Checkbox />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const PokemonList = () => {
  const listView = useStore((state) => state.listView);
  return !!listView ? <ListView /> : <GridView />;
};

const GridView = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: 4, lg: 8 }}>
      {Array(8)
        .fill(1)
        .map((val, idx) => val + idx)
        .map((v) => (
          <GridViewItem key={v} v={v} />
        ))}
    </SimpleGrid>
  );
};

const GridViewItem = ({ v }: any) => {
  return (
    <Link key={v} passHref href={"/pokemons/" + v}>
      <GridItem
        as="a"
        h="260px"
        rounded="sm"
        shadow="md"
        position="relative"
        overflow="hidden"
      >
        <NextImage
          src={`/assets/samples/${v}.png`}
          alt=""
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </GridItem>
    </Link>
  );
};

const listViewHeadings = "#||Pokemon|Type|Level".split(/\|/);

const ListView = () => {
  const router = useRouter();
  const handleClick = (id: string) => () => router.push(`/pokemons/${id}`);

  return (
    <GridTable columns="49px 75px 1fr 1fr 1fr" bgColor="brand.gray.700">
      <GridTableRow
        px={4}
        py={3}
        borderColor="brand.gray.300"
        borderBottom="1px"
      >
        {listViewHeadings.map((heading) => (
          <GridTableHeading key={heading}>{heading}</GridTableHeading>
        ))}
      </GridTableRow>

      {Array(10)
        .fill("1|/assets/samples/2.png|Pikachu|Electric|Lvl 3".split(/\|/))
        .map(([id, image, name, type, level], idx) => (
          <GridTableRow
            key={idx}
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
                src={image}
                w="32px"
                h="32px"
                showBorder
                borderColor="brand.gray.400"
              />
            </GridTableCell>
            <GridTableCell>{name}</GridTableCell>
            <GridTableCell>{type}</GridTableCell>
            <GridTableCell>{level}</GridTableCell>
          </GridTableRow>
        ))}
    </GridTable>
  );
};

const Pagination = () => {
  return (
    <Box>
      <Flex justify="flex-end">
        <Text fontSize="sm">Page 1-10 of 20</Text>
      </Flex>

      <Center>
        <HStack>
          <PageControl action="prev" />
          <Button aria-label="" color="brand.gray.800" bgColor="brand.gray.100">
            1
          </Button>
          <Button aria-label="" bgColor="brand.primary" color="brand.gray.800">
            2
          </Button>
          <PageControl action="next" />
        </HStack>
      </Center>
    </Box>
  );
};

interface PageControlProps {
  action: "next" | "prev";
  onTrigger?: () => void;
}

const PageControl = ({ action, onTrigger }: PageControlProps) => {
  const icon = action === "next" ? ChevronRightIcon : ChevronLeftIcon;

  return (
    <IconButton
      aria-label=""
      icon={<Icon as={icon} stroke="brand.gray.100" />}
      bgColor="transparent"
      onClick={onTrigger}
    />
  );
};

export default Pokemons;
