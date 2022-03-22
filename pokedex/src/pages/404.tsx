import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";

const NotFound = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Error 404</title>
      </Head>

      <Flex align="center" justify="center" minH="100vh" p={4}>
        <Box textAlign="center">
          <Heading fontSize="6xl">Ooops!</Heading>

          <Text color="brand.gray.300" mt={2}>
            The page you are trying to access does not exist
          </Text>

          <Link href="/" passHref>
            <Button as="a" mt={6}>
              Go home
            </Button>
          </Link>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default NotFound;
