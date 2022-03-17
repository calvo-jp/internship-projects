import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

/**
 *
 * @description
 * Abstracted Button component with default `bgColor` and `color`
 *
 * @example
 * <Button type="submit" mt={4}>Login</Button>
 */
const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ChakraButton color="brand.gray.800" bgColor="brand.primary" {...props}>
      {children}
    </ChakraButton>
  );
};

export default Button;
