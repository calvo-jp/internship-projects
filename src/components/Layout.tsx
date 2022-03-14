import { Box, Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box bgColor="brand.lightGray" minH="100vh">
      <Header />
      <Sidebar />

      <Flex>
        <Box w="300px" />

        <Box as="main" flexGrow={1}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
