import { Box } from "@chakra-ui/react";

const Container = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Box
      w="full"
      h="full"
      p={{ base: 4, lg: 6 }}
      pos="fixed"
      top={0}
      left={0}
      zIndex="overlay"
      bgColor="#0a0f1aeb"
    >
      {children}
    </Box>
  );
};

export default Container;
