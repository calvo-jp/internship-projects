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
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { FilterIcon, ViewGridIcon, ViewListIcon } from "@heroicons/react/solid";
import HomepageLayout from "components/layouts/homepage";
import useStore from "hooks/useStore";
import Head from "next/head";
import NextImage from "next/image";
import Link from "next/link";
import { Fragment, PropsWithChildren } from "react";

const Pokemons = () => {
  return (
    <Fragment>
      <Head>
        <title>Pokedex</title>
      </Head>

      <HomepageLayout>
        <Box
          maxW="container.lg"
          mx="auto"
          p={{ base: 4, md: 8, lg: 12 }}
          bgColor="transparent"
        >
          <HStack justify="space-between">
            <Heading
              fontSize="2xl"
              color="brand.gray.100"
              fontWeight="semibold"
            >
              Choose Pokemon
            </Heading>

            <Toolbar />
          </HStack>

          <Box mt={{ base: 6, lg: 12 }}>
            <Items />
          </Box>

          <Box mt={{ base: 2, lg: 4 }}>
            <Pagination />
          </Box>
        </Box>
      </HomepageLayout>
    </Fragment>
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
          <IconButton
            aria-label=""
            bgColor="transparent"
            icon={<Icon as={ChevronLeftIcon} stroke="brand.gray.100" />}
          />
          <Button aria-label="" color="brand.gray.800">
            1
          </Button>
          <Button aria-label="" bgColor="brand.primary" color="brand.gray.800">
            2
          </Button>
          <IconButton
            aria-label=""
            bgColor="transparent"
            icon={<Icon as={ChevronRightIcon} stroke="brand.gray.100" />}
          />
        </HStack>
      </Center>
    </Box>
  );
};

const Items = () => {
  const listView = useStore((state) => state.listView);
  return listView ? <TableView /> : <GridView />;
};

const GridView = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={{ base: 4, lg: 8 }}>
      {Array(8)
        .fill(1)
        .map((val, idx) => val + idx)
        .map((v) => (
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
        ))}
    </SimpleGrid>
  );
};

const TableView = () => {
  return (
    <Table bgColor="brand.gray.700" color="brand.gray.50">
      <Thead fontSize="sm" fontWeight="bold">
        <Tr>
          <FitTd>#</FitTd>
          <FitTd></FitTd>
          <Td>Pokemon</Td>
          <Td display={{ base: "none", md: "table-cell" }}>Type</Td>
          <Td display={{ base: "none", lg: "table-cell" }}>Level</Td>
        </Tr>
      </Thead>

      <Tbody>
        {new Array(10).fill(null).map((_, idx) => {
          return (
            <Tr key={idx}>
              <FitTd>1</FitTd>
              <FitTd>
                <Avatar w="32px" h="32px" />
              </FitTd>
              <Td>Pikachu</Td>
              <Td display={{ base: "none", md: "table-cell" }}>Electric</Td>
              <Td display={{ base: "none", lg: "table-cell" }}>Lvl 3</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

const FitTd = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Td w="1%" whiteSpace="nowrap">
      {children}
    </Td>
  );
};

const Toolbar = () => {
  const toggleListView = useStore((state) => state.toggleListView);

  return (
    <Wrap spacing={8}>
      <WrapItem>
        <FilterTool />
      </WrapItem>
      <WrapItem>
        <Icon
          as={ViewListIcon}
          fill="brand.gray.200"
          fontSize="xl"
          onClick={() => toggleListView(true)}
        />
      </WrapItem>
      <WrapItem>
        <Icon
          as={ViewGridIcon}
          fill="brand.gray.200"
          fontSize="xl"
          onClick={() => toggleListView(false)}
        />
      </WrapItem>
    </Wrap>
  );
};

const FilterTool = () => {
  // prettier-ignore
  const items = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Flying",
    "Fighting"
  ];

  return (
    <Menu closeOnSelect={false}>
      <MenuButton>
        <Icon as={FilterIcon} fill="brand.gray.200" fontSize="xl" />
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

export default Pokemons;
