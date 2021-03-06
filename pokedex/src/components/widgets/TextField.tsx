import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

interface TextFieldProps {
  error?: string;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps & InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error} color="brand.gray.50">
        {label && (
          <FormLabel fontWeight="medium" m={0}>
            {label}
          </FormLabel>
        )}

        <Input
          mt={2}
          ref={ref}
          size="lg"
          fontSize="md"
          bgColor="brand.gray.800"
          borderColor="brand.gray.500"
          _placeholder={{
            color: "brand.gray.400",
          }}
          _focus={{
            boxShadow: "none",
            borderColor: "brand.primary",
          }}
          {...props}
        />

        {!!error && (
          <FormErrorMessage mt={3} fontSize="sm" color="brand.red.500">
            {error}
          </FormErrorMessage>
        )}
      </FormControl>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
