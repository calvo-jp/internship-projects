import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import ChevronDownIcon from "@heroicons/react/outline/ChevronDownIcon";
import Link from "next/link";

const Header = () => {
  return (
    <Flex
      as="header"
      py={6}
      px={16}
      align="center"
      justify="space-between"
      bgColor="brand.gray.800"
      shadow="md"
      zIndex={100}
      pos="sticky"
      top={0}
    >
      <Link passHref href="/pokemons">
        <a>
          <Heading as="h1" fontSize="4xl" color="brand.amber.400">
            Pokedex
          </Heading>
        </a>
      </Link>

      <HStack spacing={5}>
        <Text>Welcome, JP</Text>
        <Avatar w="57px" h="57px" />

        <Menu>
          <MenuButton>
            <Icon as={ChevronDownIcon} fontSize="xl" stroke="brand.gray.100" />
          </MenuButton>
          <MenuList mt={3}>
            <MenuItem color="brand.red.500">Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
