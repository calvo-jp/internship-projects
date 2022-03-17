import {
  Icon,
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";
import { ComponentProps } from "react";

type BaseProps = Omit<ChakraIconButtonProps, "icon" | "aria-label">;

interface IconButtonProps {
  icon: (props: ComponentProps<"svg">) => JSX.Element;
  active?: boolean;
}

const IconButton = ({
  icon,
  active,
  ...props
}: IconButtonProps & BaseProps) => {
  const svg = (
    <Icon as={icon} stroke={!!active ? "brand.primary" : "brand.gray.500"} />
  );

  return (
    <ChakraIconButton
      size="sm"
      aria-label=""
      icon={svg}
      rounded="full"
      bgColor="transparent"
      borderWidth="1px"
      borderColor={!!active ? "brand.primary" : "brand.gray.500"}
      {...props}
    />
  );
};

export default IconButton;