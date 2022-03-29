import { Box, BoxProps } from "@chakra-ui/react";

const Card = ({ children, ...props }: BoxProps) => {
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
