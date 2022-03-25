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
  Skeleton,
  Text,
} from "@chakra-ui/react";
import ArrowDownIcon from "components/icons/ArrowDown";
import Link from "components/widgets/Link";
import useProfile from "hooks/useProfile";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import * as React from "react";
import loadGravatar from "utils/loadGravatar";

const Header = () => {
  const { loading, profile } = useProfile();
  const headerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (headerRef.current) revealOnScrollUp(headerRef.current);
  }, []);

  return (
    <Flex
      ref={headerRef}
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
      transitionProperty="position"
      transitionDuration="slow"
    >
      <Link href="/pokemons" _hover={{ textDecor: "none" }}>
        <Heading as="h1" fontSize="4xl" color="brand.amber.400">
          Pokedex
        </Heading>
      </Link>

      <HStack spacing={5}>
        <Skeleton isLoaded={!loading} rounded="xl">
          <Text>Welcome, {loading ? "loading..." : profile.name}</Text>
        </Skeleton>

        <Skeleton isLoaded={!loading} rounded="full">
          <Avatar
            src={
              loading
                ? undefined
                : profile.image
                ? profile.image
                : loadGravatar(profile.email)
            }
            w={{ base: "40px", lg: "57px" }}
            h={{ base: "40px", lg: "57px" }}
          />
        </Skeleton>

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
        <Icon as={ArrowDownIcon} fill="brand.gray.100" w="10px" h="10px" />
      </MenuButton>
      <MenuList mt={3} bgColor="brand.gray.800" rounded="sm">
        <MenuItem color="brand.red.500" onClick={logout}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const revealOnScrollUp = (elem: HTMLElement) => {
  let prevScrollpos = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    elem.style.top = prevScrollpos > currentScrollPos ? "0" : "-100%";
    prevScrollpos = currentScrollPos;
  });
};

export default Header;
