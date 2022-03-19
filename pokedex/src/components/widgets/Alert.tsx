import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
  AlertProps as ChakraAlertProps,
  CloseButton,
  Collapse,
} from "@chakra-ui/react";

type BaseProps = Omit<ChakraAlertProps, "in" | "status" | "variant">;

interface AlertProps {
  open?: boolean;
  message?: string;
  onClose?: () => void;
  variant?: ChakraAlertProps["status"];
}

/**
 *
 * Abstraction of Chakra's `Alert` with more sensible props.
 * This component is wrapped inside a `Collapse` and is hidden by default.
 *
 * @example
 * <Alert
 *    mt={4}
 *    mb={2}
 *    open={!!error}
 *    variant="error"
 *    message={error}
 *    onClose={() => setError("")}
 * />
 *
 */
const Alert = ({
  open,
  message,
  onClose,
  variant,
  ...props
}: AlertProps & BaseProps) => {
  return (
    <Collapse in={open} unmountOnExit>
      <ChakraAlert status={variant} rounded="sm" shadow="sm" {...props}>
        <AlertIcon />
        <AlertDescription flexGrow="1" ml={2}>
          {message}
        </AlertDescription>
        <CloseButton onClick={onClose} />
      </ChakraAlert>
    </Collapse>
  );
};

export default Alert;
