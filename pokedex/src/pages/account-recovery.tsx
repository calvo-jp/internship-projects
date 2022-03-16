import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputProps,
  Link,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Head from "next/head";
import NextLink from "next/link";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const AccountRecovery = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Recover Account</title>
      </Head>

      <Flex minH="100vh" color="gray.800">
        <Box h="100vh" w="40%">
          <BackgroundImage />
        </Box>

        <Flex flexGrow={1} p={4} direction="column" justify="center">
          <Box>
            <Box maxW="400px" mx="auto">
              <AccountRecoveryForm />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

const BackgroundImage = () => {
  return (
    <Box
      bgImage="url(/assets/bg/forgot-password.png)"
      backgroundSize="cover"
      backgroundPosition="center"
      w="full"
      h="full"
    />
  );
};

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
  })
  .required();

const AccountRecoveryForm = () => {
  const { register, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Box>
      <Heading as="h1" fontSize="5xl">
        Forgot Password
      </Heading>

      <Box as="form" mt={8}>
        <VStack spacing={4}>
          <TextField
            size="lg"
            fontSize="md"
            label="Email"
            placeholder="Enter email"
            error={formState.errors.email?.message}
            {...register("email")}
          />
        </VStack>

        <Button
          bgColor="#1E40AF"
          color="#F7FAFC"
          size="lg"
          fontSize="sm"
          mt={6}
          w="full"
        >
          Sign In
        </Button>
      </Box>

      <Center mt={12} fontSize="sm">
        <HStack>
          <Box>Remember your password?</Box>
          <NextLink passHref href="/login">
            <Link color="brand.tertiary">Log in</Link>
          </NextLink>
        </HStack>
      </Center>
    </Box>
  );
};

interface TextFieldProps {
  error?: string;
  label?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps & InputProps>(
  ({ error, label, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {label && <FormLabel fontWeight="medium">{label}</FormLabel>}

        <Input mt={2} borderColor="gray.100" ref={ref} {...props} />

        <FormErrorMessage fontSize="sm">{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

TextField.displayName = "TextField";

export default AccountRecovery;
