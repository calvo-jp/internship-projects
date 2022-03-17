import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "../../Header";
import Background from "./Background";

/**
 *
 * @description
 * Base layout of pages with authenticated users
 *
 */
const HomepageLayout = ({ children }: PropsWithChildren<{}>) => {
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
