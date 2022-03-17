import { Heading, HeadingProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const CardHeading = ({
  children,
  ...props
}: PropsWithChildren<HeadingProps>) => {
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
