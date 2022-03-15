import { Flex, Spinner } from "@chakra-ui/react";
import Head from "next/head";

const Loader = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>

      <Flex minH="100vh" align="center" justify="center">
        <Spinner
          thickness="0.5rem"
          speed="800ms"
          emptyColor="gray.300"
          color="orange.400"
          h={125}
          w={125}
        />
      </Flex>
    </>
  );
};

export default Loader;
