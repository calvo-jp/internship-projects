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
import Link from "components/widgets/Link";
import useProfile from "hooks/useProfile";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import loadGravatar from "utils/loadGravatar";

const Header = () => {
  const { loading, profile } = useProfile();

  if (loading) return null;
  if (!profile) return null;

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
      <Link href="/pokemons" _hover={{ textDecor: "none" }}>
        <Heading as="h1" fontSize="4xl" color="brand.amber.400">
          Pokedex
        </Heading>
      </Link>

      <HStack spacing={5}>
        <Text>Welcome, {profile.name}</Text>
        <Avatar
          src={profile.image ? profile.image : loadGravatar(profile.email)}
          w="57px"
          h="57px"
          showBorder
          borderColor="brand.primary"
        />
        <Dropdown />
      </HStack>
    </Flex>
  );
};

const Dropdown = () => {
  const { push } = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    await push("/");
  };

  return (
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
  );
};

export default Header;
