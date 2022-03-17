import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface CardProps {
  fullWidth?: boolean;
}

const Card = ({ children, fullWidth }: PropsWithChildren<CardProps>) => {
  return (
    <Box
      py={6}
      px={8}
      border="1px"
      borderColor="brand.gray.500"
      bgColor="brand.gray.800"
      w={fullWidth ? "full" : "fit-content"}
      rounded="sm"
      fontSize="md"
    >
      {children}
    </Box>
  );
};

export default Card;