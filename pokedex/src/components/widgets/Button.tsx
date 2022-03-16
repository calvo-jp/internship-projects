import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ChakraButton
      size="lg"
      color="brand.gray.800"
      bgColor="brand.primary"
      fontSize="sm"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
