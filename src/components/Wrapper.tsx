import { Box, Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const Wrapper = (props: PropsWithChildren<{}>) => {
  return (
    <Box maxW="container.lg" mx="auto" p={{ base: 4, lg: 8 }}>
      {props.children}
    </Box>
  );
};

export default Wrapper;
