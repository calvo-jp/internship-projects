import { Heading, HeadingProps } from "@chakra-ui/react";

const CardHeading = ({ children, ...props }: HeadingProps) => {
  return (
    <Heading
      color="brand.blue.400"
      fontSize="md"
      fontWeight="semibold"
      {...props}
    >
      {children}
    </Heading>
  );
};

export default CardHeading;
