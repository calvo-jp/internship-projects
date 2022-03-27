import { Box } from "@chakra-ui/react";
import * as React from "react";

const Container = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  return (
    <Box
      w="full"
      h="full"
      p={4}
      position="fixed"
      top={0}
      left={0}
      bgColor="brand.gray.900"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Container;
