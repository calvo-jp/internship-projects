import { Box, Heading } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface LayoutProps {
  title?: string;
}

const Layout = ({ title, children }: PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Navbar />

      <Box
        as="main"
        maxW="750px"
        mx="auto"
        p={{ base: 4, lg: 8 }}
        mt={{ base: 6, lg: 16 }}
      >
        {title && (
          <Heading
            as="h1"
            fontWeight="bold"
            fontSize={{ base: "3xl", lg: "4xl" }}
            mb={{ base: 5, lg: 14 }}
          >
            {title}
          </Heading>
        )}

        <Box>{children}</Box>
      </Box>

      <Footer />
    </>
  );
};

export default Layout;
