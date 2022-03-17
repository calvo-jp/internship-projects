import { Tag, TagProps } from "@chakra-ui/react";
import clsx from "clsx";
import { PropsWithChildren } from "react";

type BaseProps = Omit<TagProps, "variant">;

interface CardTagProps {
  variant: "error" | "success" | "info";
}

const CardTag = ({
  variant,
  children,
  ...props
}: PropsWithChildren<CardTagProps & BaseProps>) => {
  return (
    <Tag
      py={2}
      px={8}
      border="1px"
      color={clsx({
        "brand.red.700": variant === "error",
        "brand.blue.700": variant === "info",
        "brand.green.700": variant === "success",
      })}
      bgColor={clsx({
        "brand.red.50": variant === "error",
        "brand.blue.50": variant === "info",
        "brand.green.50": variant === "success",
      })}
      borderColor={clsx({
        "brand.red.200": variant === "error",
        "brand.blue.200": variant === "info",
        "brand.green.200": variant === "success",
      })}
      fontFamily="'Public Sans', sans-serif"
      fontSize="xs"
      {...props}
    >
      {children}
    </Tag>
  );
};

export default CardTag;
