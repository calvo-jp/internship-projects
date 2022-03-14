import {
  Avatar,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import sha256 from "utils/sha256";
import Brand from "./Brand";

const Header = () => {
  const { data } = useSession({ required: true });

  if (!data?.user) return <Fragment />;

  const currentUser = data.user;
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Flex
      as="header"
      px={8}
      justify="space-between"
      bgColor="white"
      shadow="md"
      zIndex="sticky"
      pos="sticky"
      top={0}
      h="75px"
    >
      <Brand small />

      <HStack spacing={4} divider={<Divider orientation="vertical" h={6} />}>
        <HStack spacing={3}>
          <Avatar
            as="a"
            src={currentUser.image || gravatar(currentUser.email!)}
            size="md"
          />

          <VStack spacing={0} align="start">
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              fontSize="lg"
              lineHeight={1}
              color="brand.red"
            >
              {currentUser.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {currentUser.email}
            </Text>
          </VStack>
        </HStack>

        <Button onClick={handleLogout}>Logout</Button>
      </HStack>
    </Flex>
  );
};

const gravatar = (email: string) => {
  return "https://www.gravatar.com/avatar/" + sha256(email) + "?d=retro&s=150";
};

export default Header;
