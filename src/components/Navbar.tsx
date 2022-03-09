import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  Link as ChakraLink,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const Navbar = () => {
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (navbar) revealOnScrollUp(navbar);
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
      zIndex="banner"
      transitionProperty="position"
      transitionDuration="slow"
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
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <MenuToggler onToggle={onOpen} />

      <Box
        position="fixed"
        display={{ base: isOpen ? "flex" : "none", lg: "none" }}
        h="50%"
        w="full"
        top={0}
        left={0}
        zIndex="modal"
        alignItems="center"
        justifyContent="center"
        bgColor="brand.white"
      >
        <CloseButton
          onClick={onClose}
          position="absolute"
          zIndex="modal"
          right={6}
          top={4}
          size="lg"
          display={{ base: "block", lg: "none" }}
        />

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
    <IconButton
      onClick={onToggle}
      aria-label="toggle menu"
      bgColor="transparent"
      icon={<HamburgerIcon w={6} h={6} />}
      display={{ base: "block", lg: "none" }}
    />
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
                  fontWeight="medium"
                  fontSize="xl"
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

const revealOnScrollUp = (elem: HTMLElement) => {
  let prevScrollpos = window.pageYOffset;

  window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    elem.style.top = prevScrollpos > currentScrollPos ? "0" : "-100%";
    prevScrollpos = currentScrollPos;
  });
};

export default Navbar;
