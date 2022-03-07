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
      py={{ base: 4, lg: 8 }}
      px={{ base: 6, lg: 12 }}
      justify="end"
      bgColor="brand.white"
      zIndex={99}
      position="sticky"
      top={0}
      transition="all"
      transitionDuration="350ms"
    >
      {visible && (
        <Box
          as="button"
          display={{ base: "block", lg: "none" }}
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
          display={{ base: "block", lg: "none" }}
          onClick={() => setVisible(true)}
          zIndex={999}
        >
          <HamburgerIcon w={6} h={6} />
        </Box>

        <Wrap
          spacing={4}
          position={{ base: "fixed", lg: "static" }}
          display={{
            base: visible ? "flex" : "none",
            lg: "block",
          }}
          h="full"
          w="full"
          top={0}
          left={0}
          zIndex={99}
          alignItems="center"
          justifyContent="center"
          bgColor="white"
          direction={{ base: "column", lg: "row" }}
        >
          {links.map((link) => {
            const href = "/" + link.toLowerCase();
            const active = router.pathname.startsWith(href);

            return (
              <WrapItem key={link} w="fit-content">
                <NextLink href={href} passHref>
                  <ChakraLink
                    fontWeight={500}
                    fontSize="20px"
                    color={active ? "brand.maroon" : "inherit"}
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

const onScrollReveal = (elem: HTMLElement) => {
  const win = window;
  let prevScrollpos = win.pageYOffset;

  win.addEventListener("scroll", () => {
    const currentScrollPos = win.pageYOffset;
    elem.style.top = prevScrollpos > currentScrollPos ? "0" : "-100%";
    prevScrollpos = currentScrollPos;
  });
};

export default Navbar;
