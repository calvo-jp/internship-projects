import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Error 404 | Page not found</title>
      </Head>

      <Flex align="center" justify="center" minHeight="100vh">
        <Stack alignItems="center" spacing={3}>
          <Text
            fontWeight="bold"
            fontSize="5xl"
            lineHeight={0.8}
            color="gray.600"
          >
            ERROR 404
          </Text>

          <Text color="gray.500" lineHeight={1}>
            The page you are looking for does not exist
          </Text>

          <Link passHref href="/">
            <Button as="a" leftIcon={<ArrowBackIcon />}>
              Go back
            </Button>
          </Link>
        </Stack>
      </Flex>
    </>
  );
}
