import {
  FormControl,
  FormErrorMessage,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

interface TextFieldProps {
  error?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps & InputProps>(
  ({ error, ...all }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        <Input px={4} py={6} rounded="sm" {...all} ref={ref} />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
