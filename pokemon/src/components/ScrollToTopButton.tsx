import { ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [showScrollTopButton, setShowScollTopButton] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () => {
    if (window.scrollY > 0) setShowScollTopButton(true);
    else setShowScollTopButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setShowScollTopButton(false);
    };
  }, []);

  return (
    <>
      {showScrollTopButton && (
        <IconButton
          onClick={scrollToTop}
          aria-label="Go to top"
          position="fixed"
          bottom={4}
          right={4}
          zIndex={99}
          w={12}
          h={12}
          rounded="full"
          bg="orange.400"
          shadow="md"
          _hover={{ bg: "orange.500" }}
          _active={{ bg: "orange.500" }}
          _focus={{ boxShadow: "none" }}
        >
          <ChevronUpIcon w={8} h={8} color="white" />
        </IconButton>
      )}
    </>
  );
};

export default ScrollToTopButton;
