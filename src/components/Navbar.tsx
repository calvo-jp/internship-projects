import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
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
import { useEffect, useRef, useState } from "react";

const onScrollReveal = (element: HTMLElement) => {
  var prevScrollpos = window.pageYOffset;

  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      element.style.top = "0";
    } else {
      element.style.top = "-100%";
    }

    prevScrollpos = currentScrollPos;
  };
};

const Navbar = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const links = ["Works", "Blog", "Contact"];

  useEffect(() => {
    const header = ref.current;
    if (header) onScrollReveal(header);
  }, []);

  return (
    <Flex
      ref={ref}
      as="header"
      py={{ base: 4, md: 8 }}
      px={{ base: 6, md: 12 }}
      justify="end"
      bgColor="white"
      zIndex={99}
      position="sticky"
      top={0}
      transition="all"
      transitionDuration="300ms"
    >
      {visible && (
        <Box
          as="button"
          display={{ base: "block", md: "none" }}
          onClick={() => setVisible(false)}
          position="absolute"
          right={6}
          top={4}
          zIndex={999}
        >
          <CloseIcon w={4} h={4} />
        </Box>
      )}

      <Box>
        <Box
          as="button"
          display={{ base: "block", md: "none" }}
          onClick={() => setVisible(true)}
          zIndex={999}
        >
          <HamburgerIcon w={6} h={6} />
        </Box>

        <Wrap
          spacing={4}
          position={{ base: "fixed", md: "static" }}
          display={{
            base: visible ? "flex" : "none",
            md: "block",
          }}
          h="full"
          w="full"
          top={0}
          left={0}
          zIndex={99}
          alignItems="center"
          justifyContent="center"
          bgColor="white"
          direction={{ base: "column", md: "row" }}
        >
          {links.map((link) => {
            const href = "/" + link.toLowerCase();

            return (
              <WrapItem key={link} w="fit-content">
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
