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
  console.log(router.pathname);

  const links = ["Works", "Blog", "Contact"];

  return (
    <Flex as="header" py={8} px={12} justify="end" maxW="">
      <Box>
        <Wrap spacing={4}>
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
