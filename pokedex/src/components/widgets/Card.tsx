import { Box, BoxProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface CardProps {
  fullWidth?: boolean;
}

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
 * @usage
 * ```javascript
 * <Card mt={4}>
 * ...
 * </Card>
 * ```
 *
 */
const Card = ({
  children,
  fullWidth,
}: PropsWithChildren<CardProps & BoxProps>) => {
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
