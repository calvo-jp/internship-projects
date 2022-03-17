import { Tag } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const CardTag = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Tag
      py={2}
      px={8}
      color="brand.red.700"
      bgColor="brand.red.50"
      fontSize="xs"
    >
      {children}
    </Tag>
  );
};

export default CardTag;
