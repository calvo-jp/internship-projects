import { Heading, HeadingProps } from "@chakra-ui/react";
import * as React from "react";

const CardHeading = ({
  children,
  ...props
}: React.PropsWithChildren<HeadingProps>) => {
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
