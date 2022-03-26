import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import SadEmojiIcon from "components/icons/SadEmoji";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";

const NotFound = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Error 404</title>
      </Head>

      <Flex
        p={4}
        align="center"
        justify="center"
        flexDirection="column"
        minH="100vh"
        gap={4}
      >
        <Box>
          <Icon as={SadEmojiIcon} w={32} h={32} fill="brand.gray.700" />
        </Box>

        <Box textAlign="center">
          <Heading fontSize="6xl">Ooops!</Heading>

          <Text color="brand.gray.400" mt={2}>
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
