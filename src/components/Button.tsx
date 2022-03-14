import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button = ({ children, ...all }: ButtonProps) => {
  return (
    <ChakraButton
      bgColor="brand.red"
      color="white"
      rounded="sm"
      mt={8}
      p={6}
      transition="background 300ms ease-in-out"
      _hover={{ bgColor: "black" }}
      _focus={{ bgColor: "black", boxShadow: "none" }}
      {...all}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
