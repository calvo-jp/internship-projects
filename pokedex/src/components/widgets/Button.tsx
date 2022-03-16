import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ChakraButton color="brand.gray.800" bgColor="brand.primary" {...props}>
      {children}
    </ChakraButton>
  );
};

export default Button;
