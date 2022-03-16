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
import Layout from "components/layout";
import Head from "next/head";
import NextImage from "next/image";
import Link from "next/link";

const Pokemons = () => {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <Layout>
        <HStack justify="space-between">
          <Heading fontSize="2xl" color="brand.gray.100" fontWeight="semibold">
            Choose Pokemon
          </Heading>

          <Toolbar />
        </HStack>

        <Box mt={12}>
          <Items />
        </Box>

        <Box mt={4}>
          <Pagination />
        </Box>
      </Layout>
    </>
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

interface ItemsProps {
  table?: boolean;
}

const Items = ({ table }: ItemsProps) => {
  return table ? <TableView /> : <GridView />;
};

const GridView = () => {
  return (
    <SimpleGrid columns={4} gap={8}>
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
    <Box>
      <Table bgColor="brand.gray.700" color="brand.gray.50">
        <Thead fontSize="sm" fontWeight="bold">
          <Tr>
            <Td w="1%" whiteSpace="nowrap">
              #
            </Td>
            <Td w="1%" whiteSpace="nowrap"></Td>
            <Td>Pokemon</Td>
            <Td>Type</Td>
            <Td>Level</Td>
          </Tr>
        </Thead>

        <Tbody>
          {new Array(10).fill(null).map((_, idx) => {
            return (
              <Tr key={idx}>
                <Td w="1%" whiteSpace="nowrap">
                  1
                </Td>
                <Td w="1%" whiteSpace="nowrap">
                  <Avatar w="32px" h="32px" />
                </Td>
                <Td>Pikachu</Td>
                <Td>Electric</Td>
                <Td>Lvl 3</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

const Toolbar = () => {
  return (
    <Wrap spacing={8}>
      <WrapItem>
        <FilterTool />
      </WrapItem>
      <WrapItem>
        <Icon as={ViewListIcon} fill="brand.gray.200" fontSize="xl" />
      </WrapItem>
      <WrapItem>
        <Icon as={ViewGridIcon} fill="brand.gray.200" fontSize="xl" />
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
