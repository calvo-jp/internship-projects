import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "../Header";
import Background from "./Background";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Box bgColor="#111827" color="#ffffff" minH="100vh">
        <Header />

        <Box position="relative">
          <Box
            as="main"
            position="relative"
            zIndex="1"
            maxW="container.lg"
            mx="auto"
            p={{ base: 4, lg: 12 }}
            bgColor="transparent"
          >
            {children}
          </Box>

          <Background />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
