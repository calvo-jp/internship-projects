import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "../Header";
import Background from "./Background";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Box minH="100vh">
        <Header />

        <Box position="relative">
          <Box as="main" position="relative" zIndex="1">
            {children}
          </Box>

          <Background />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
