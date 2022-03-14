import { Input, InputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

const TextField = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Input
      ref={ref}
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
});

TextField.displayName = "TextField";
export default TextField;
