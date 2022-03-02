import { Box, Button, Text } from "@chakra-ui/react";
import Header from "components/Header";
import Head from "next/head";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Error 404 | Page not found</title>
      </Head>

      <Header />

      <Box>TODO</Box>
    </>
  );
};

export default NotFound;
