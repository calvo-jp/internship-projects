import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import Background from "./Background";
import Header from "./Header";

/**
 *
 * @description
 * Base layout of pages with authenticated users
 *
 */
const HomepageLayout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Flex minH="100vh" direction="column">
      <Header />

      <Box position="relative" flexGrow="1" w="full">
        <Box as="main" position="relative" zIndex="1">
          {children}
        </Box>

        <Background />
      </Box>
    </Flex>
  );
};

export default HomepageLayout;
