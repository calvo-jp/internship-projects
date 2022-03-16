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

const Header = () => {
  return (
    <Flex
      px={16}
      py={6}
      align="center"
      justify="space-between"
      bgColor="#1F2937"
      zIndex={100}
      as="header"
      position="sticky"
    >
      <Heading fontSize="4xl" color="#FFCA28">
        Pokedex
      </Heading>

      <HStack spacing={5}>
        <Text color="white">Welcome, JP</Text>
        <Avatar w="57px" h="57px" />

        <Menu>
          <MenuButton>
            <Icon p={0} as={ChevronDownIcon} fontSize="xl" stroke="white" />
          </MenuButton>
          <MenuList mt={3} w="175px">
            <MenuItem color="#EF4444">Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
