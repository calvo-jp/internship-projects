import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ChakraButton
      p={6}
      mt={4}
      bgColor="brand.red"
      color="white"
      rounded="sm"
      transition="background 300ms ease-in-out"
      _hover={{ bgColor: "black" }}
      _focus={{ bgColor: "black", boxShadow: "none" }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
