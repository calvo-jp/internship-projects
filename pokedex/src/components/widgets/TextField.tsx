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

/**
 *
 * @description
 * An input component wrapped in `FormControl`
 * with an input size of `lg` and a fontSize of `md`,
 * but is overridable by passing `InputProps`.
 *
 * __WARNING__: other props other than label and error
 * are being passed down to input component.
 * Please be careful when using margins
 *
 * @example
 * <TextField
 *    name="field"
 *    label="Field"
 *    error="Invalid field value"
 *    ...
 * />
 *
 * @see
 * https://chakra-ui.com/docs/components/form/form-control
 *
 */
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
