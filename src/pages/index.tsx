import { Box, Link as ChakraLink, Wrap, WrapItem } from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";

const Landing = () => {
  return (
    <>
      <Head>
        <title>Portfolio UI</title>
      </Head>

      <Box>
        <Navbar />
      </Box>
    </>
  );
};

const Navbar = () => {
  const links = ["works", "blog", "contact"];
  return (
    <Box as="header">
      <Box>
        <Wrap>
          {links.map((link) => (
            <WrapItem key={link}>
              <NextLink href={link} passHref>
                <ChakraLink>{link}</ChakraLink>
              </NextLink>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Box>
  );
};

export default Landing;
