import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

interface ErrorProps {
  title: string;
  message: string;
  redirect: string;
}

const Error = ({ title, message, redirect }: ErrorProps) => {
  return (
    <>
      <Head>
        <title>
          {title} | {message}
        </title>
      </Head>

      <Flex align="center" justify="center" minHeight="100vh">
        <VStack spacing={3}>
          <Heading fontSize="5xl" lineHeight={0.8} color="gray.600">
            {title}
          </Heading>

          <Text color="gray.500" lineHeight={1}>
            {message}
          </Text>

          <Link passHref href={redirect}>
            <Button as="a" leftIcon={<ArrowBackIcon />}>
              Go back
            </Button>
          </Link>
        </VStack>
      </Flex>
    </>
  );
};
export default Error;
