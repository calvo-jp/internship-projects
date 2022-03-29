import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import * as React from "react";

type BaseProps = Omit<IconButtonProps, "aria-label" | "icon">;

interface ControlProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const Control = ({ icon, ...props }: ControlProps & BaseProps) => {
  return (
    <IconButton
      aria-label=""
      width="48px"
      height="48px"
      bgColor="brand.gray.800"
      rounded="full"
      flexShrink={0}
      borderColor="brand.gray.900"
      icon={<Icon as={icon} fontSize="2xl" stroke="brand.gray.400" />}
      _hover={{ bgColor: "brand.gray.800" }}
      _active={{ bgColor: "brand.gray.800" }}
      _focus={{ boxShadow: "none" }}
      {...props}
    />
  );
};

export default Control;
