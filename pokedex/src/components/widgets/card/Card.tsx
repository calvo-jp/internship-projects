import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";

const Card = ({ children, ...props }: React.PropsWithChildren<BoxProps>) => {
  return (
    <Box
      py={6}
      px={8}
      border="1px"
      borderColor="brand.gray.500"
      bgColor="brand.gray.800"
      rounded="sm"
      fontSize="md"
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
