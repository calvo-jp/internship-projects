import {
  Avatar,
  Box,
  Button,
  Center,
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

const Pokemons = () => {
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>

      <Layout>
        <HStack justify="space-between">
          <Heading fontSize="2xl" color="#EDF2F7">
            Choose Pokemon
          </Heading>

          <Toolbar />
        </HStack>

        <Box mt={12}>
          <Items table />
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
            icon={<Icon as={ChevronLeftIcon} fontSize="md" />}
            bgColor="transparent"
          />
          <Button aria-label="" rounded="md" color="#1F2937">
            1
          </Button>
          <Button aria-label="" rounded="md" bgColor="#FFD12D" color="#1F2937">
            2
          </Button>
          <IconButton
            aria-label=""
            icon={<Icon as={ChevronRightIcon} />}
            bgColor="transparent"
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
  if (table) return <TableView />;

  return null;
};

const TableView = () => {
  return (
    <Box>
      <Table bg="#374151" color="#F7FAFC">
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
        <Menu closeOnSelect={false}>
          <MenuButton>
            <Icon as={FilterIcon} fill="#E2E8F0" fontSize="xl" />
          </MenuButton>
          <MenuList color="#374151" ml={-5}>
            {["Normal", "Fire", "Water", "Grass", "Flying", "Fighting"].map(
              (item) => (
                <MenuItem
                  key={item}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Text fontSize="sm">{item}</Text>
                  <Checkbox colorScheme="yellow" />
                </MenuItem>
              )
            )}
          </MenuList>
        </Menu>
      </WrapItem>
      <WrapItem>
        <Icon as={ViewListIcon} fill="#E2E8F0" fontSize="xl" />
      </WrapItem>
      <WrapItem>
        <Icon as={ViewGridIcon} fill="#E2E8F0" fontSize="xl" />
      </WrapItem>
    </Wrap>
  );
};

export default Pokemons;
