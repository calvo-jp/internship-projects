import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

/**
 *
 * @description
 * an overridable Card component that
 * comes with the following props set
 * - `padding`
 * - `borderColor`
 * - `bgColor`
 * - `borderRadius`
 * - `fontSize`
 *
 * @example
 * <Card mt={4}>
 * ...
 * </Card>
 *
 */
const Card = ({ children, ...props }: PropsWithChildren<BoxProps>) => {
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
