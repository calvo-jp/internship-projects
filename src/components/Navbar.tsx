import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) onScrollReveal(navbar);
  }, []);

  return (
    <Flex
      as="header"
      ref={navbarRef}
      py={{ base: 4, lg: 8 }}
      px={{ base: 6, lg: 12 }}
      justify="end"
      bgColor="brand.white"
      position="sticky"
      top={0}
      zIndex={99}
      transition="all"
      transitionDuration="350ms"
    >
      <NavLinks />
    </Flex>
  );
};

const links = ["Works", "Blog", "Contact"];

const NavLinks = () => {
  return (
    <>
      {/* mobile */}
      <Box display={{ base: "block", lg: "none" }} as="nav">
        <NavLinksMobile />
      </Box>

      {/* desktop */}
      <Box display={{ base: "none", lg: "block" }} as="nav">
        <NavLinksBase />
      </Box>
    </>
  );
};

const NavLinksMobile = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <MenuToggler onToggle={() => setVisible(true)} />

      <Box
        position="fixed"
        display={{ base: visible ? "flex" : "none", lg: "none" }}
        h="full"
        w="full"
        top={0}
        left={0}
        zIndex={99}
        alignItems="center"
        justifyContent="center"
        bgColor="brand.white"
      >
        <CloseButton onClose={() => setVisible(false)} />

        <Box>
          <NavLinksBase />
        </Box>
      </Box>
    </>
  );
};

interface MenuTogglerProps {
  onToggle: () => void;
}

const MenuToggler = ({ onToggle }: MenuTogglerProps) => {
  return (
    <Box as="button" display={{ base: "block", lg: "none" }} onClick={onToggle}>
      <HamburgerIcon w={6} h={6} />
    </Box>
  );
};

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton = (props: CloseButtonProps) => {
  return (
    <Box
      as="button"
      display={{ base: "block", lg: "none" }}
      position="absolute"
      zIndex={999}
      right={7}
      top={4}
      onClick={props.onClose}
    >
      <CloseIcon w={4} h={4} />
    </Box>
  );
};

const NavLinksBase = () => {
  const router = useRouter();

  return (
    <Box as="nav">
      <Wrap
        spacing={{ base: 2, lg: 4 }}
        direction={{ base: "column", lg: "row" }}
      >
        {links.map((link) => {
          const href = `/${link.toLowerCase()}`;
          const active = router.pathname.startsWith(href);

          return (
            <WrapItem
              w="fit-content"
              display="flex"
              alignItems="center"
              key={link}
            >
              <NextLink href={href} passHref>
                <ChakraLink
                  fontWeight={500}
                  fontSize="20px"
                  color={active ? "brand.maroon" : "inherit"}
                  _hover={{ textDecor: "none" }}
                >
                  {link}
                </ChakraLink>
              </NextLink>
            </WrapItem>
          );
        })}
      </Wrap>
    </Box>
  );
};

const onScrollReveal = (elem: HTMLElement) => {
  let prevScrollpos = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    elem.style.top = prevScrollpos > currentScrollPos ? "0" : "-100%";
    prevScrollpos = currentScrollPos;
  });
};

export default Navbar;
