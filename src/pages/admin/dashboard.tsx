import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>NextJS Auth | Dashboard</title>
      </Head>

      <Box bgColor="brand.lightGray" minH="100vh">
        <Header />

        <Main />
      </Box>
    </>
  );
};

const Main = () => {
  return (
    <Box p={8}>
      <Heading color="gray.700">Dashboard</Heading>
    </Box>
  );
};

const Header = () => {
  const { data, status } = useSession({ required: true });

  if (status === "loading") return <div>Loading...</div>;
  if (!data) return <></>;

  const user = data.user!;
  const image = user.image || "";

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/login",
    });
  };

  return (
    <Flex
      as="header"
      p={4}
      justify="space-between"
      bgColor="white"
      shadow="md"
      zIndex="sticky"
      pos="sticky"
      top={0}
    >
      <HStack spacing={4}>
        <Image src="/images/logo.png" alt="" h={12} />

        <Box>
          <Heading fontSize="2xl" lineHeight={1}>
            Shelter
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Help Animals
          </Text>
        </Box>
      </HStack>

      <HStack spacing={4}>
        <Image src={image} alt="" w={12} h={12} rounded="full" />
        <Box>
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            fontSize="lg"
            lineHeight={1}
            color="brand.red"
          >
            {user.name}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {user.email}
          </Text>
        </Box>

        <Divider orientation="vertical" h={6} />

        <Button onClick={handleLogout}>Logout</Button>
      </HStack>
    </Flex>
  );
};

export default Dashboard;
