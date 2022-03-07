import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const links = ["Works", "Blog", "Contact"];

  return (
    <Flex
      as="header"
      py={{ base: 4, md: 8 }}
      px={{ base: 6, md: 12 }}
      justify="end"
      position="sticky"
      top={0}
      bgColor="white"
      zIndex={99}
    >
      <Box>
        <Box as="button" display={{ base: "block", md: "none" }}>
          <HamburgerIcon w={6} h={6} />
        </Box>

        <Wrap spacing={4} display={{ base: "none", md: "block" }}>
          {links.map((link) => {
            const href = "/" + link.toLowerCase();

            return (
              <WrapItem key={link}>
                <NextLink href={href} passHref>
                  <ChakraLink
                    fontWeight={500}
                    fontSize="20px"
                    color={
                      router.pathname.startsWith(href) ? "#FF6464" : "inherit"
                    }
                    _hover={{
                      textDecor: "none",
                    }}
                  >
                    {link}
                  </ChakraLink>
                </NextLink>
              </WrapItem>
            );
          })}
        </Wrap>
      </Box>
    </Flex>
  );
};

export default Navbar;
