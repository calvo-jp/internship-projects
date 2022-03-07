import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Navbar = () => {
  const links = ["Works", "Blog", "Contact"];

  return (
    <Flex as="header" py={8} px={12} justify="end" maxW="">
      <Box>
        <Wrap spacing={4}>
          {links.map((link) => (
            <WrapItem key={link}>
              <NextLink href={"/" + link.toLowerCase()} passHref>
                <ChakraLink fontWeight={500} fontSize="20px">
                  {link}
                </ChakraLink>
              </NextLink>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Flex>
  );
};

export default Navbar;
