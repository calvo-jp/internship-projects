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

      <Box as="main" maxW="container.md" mx="auto" p={{ base: 4, lg: 8 }}>
        {title && (
          <Heading
            as="h1"
            fontWeight={700}
            fontSize={{ base: "30px", lg: "44px" }}
            mb={{ base: 8, lg: 16 }}
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
