import { Input, InputProps } from "@chakra-ui/react";
import { ComponentProps } from "react";

export default function TextField(props: InputProps) {
  return (
    <Input
      rounded="sm"
      px={4}
      py={6}
      _focus={{
        outline: "none",
        borderColor: "gray.300",
      }}
      {...props}
    />
  );
}
