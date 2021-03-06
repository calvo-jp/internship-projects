import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  const { status } = useSession();

  if (status === "loading") return null;

  return (
    <>
      <Head>
        <title>Error 404</title>
      </Head>

      <Flex
        p={4}
        align="center"
        justify="center"
        flexDirection="column"
        minH="100vh"
      >
        <Box textAlign="center">
          <Heading fontSize="6xl">Ooops!</Heading>

          <Text color="brand.gray.400" mt={2}>
            The page you are trying to access does not exist
          </Text>

          <Link
            href={status === "authenticated" ? "/pokemons" : "/login"}
            passHref
          >
            <Button as="a" mt={6}>
              Go home
            </Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default NotFound;
