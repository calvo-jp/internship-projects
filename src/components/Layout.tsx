import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box bgColor="brand.lightGray" minH="100vh">
      <Header />
      <Sidebar />
      <Box as="main" ml="300px">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
