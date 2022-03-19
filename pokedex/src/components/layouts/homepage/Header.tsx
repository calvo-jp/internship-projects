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
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { push } = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    await push("/");
  };

  return (
    <Flex
      as="header"
      py={{ base: 2, md: 4, lg: 6 }}
      px={{ base: 4, md: 8, lg: 16 }}
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
        <Avatar w="57px" h="57px" showBorder borderColor="brand.primary" />

        <Menu>
          <MenuButton>
            <Icon as={ChevronDownIcon} fontSize="xl" stroke="brand.gray.100" />
          </MenuButton>
          <MenuList mt={3} bgColor="white">
            <MenuItem color="brand.red.500" onClick={logout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
