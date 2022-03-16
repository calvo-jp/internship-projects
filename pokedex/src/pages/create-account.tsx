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

const CreateAccount = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Create Account</title>
      </Head>

      <Flex minH="100vh" color="#F7FAFC" bgColor="#111827">
        <Box h="100vh" w="600px" maxW="40%">
          <BackgroundImage />
        </Box>

        <Flex flexGrow={1} p={4} direction="column" justify="center">
          <Box>
            <Box maxW="400px" mx="auto">
              <CreateAccountForm />
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
      bgImage="url(/assets/bg/sign-up.png)"
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
    password: yup.string().trim().required(),
  })
  .required();

const CreateAccountForm = () => {
  const { register, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Box>
      <Heading as="h1" fontSize="5xl" color="white">
        Sign up
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

          <TextField
            size="lg"
            fontSize="md"
            label="Password"
            placeholder="Enter Password"
            error={formState.errors.password?.message}
            {...register("password")}
          />
        </VStack>

        <Button
          bgColor="#FFC107"
          color="#1F2937"
          size="lg"
          fontSize="sm"
          mt={6}
          w="full"
        >
          Create Account
        </Button>
      </Box>

      <Center mt={12} fontSize="sm">
        <HStack>
          <Box>Already have an account?</Box>
          <NextLink passHref href="/login">
            <Link color="#FFC107">Log in</Link>
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
        {label && (
          <FormLabel fontWeight="medium" color="#F7FAFC">
            {label}
          </FormLabel>
        )}

        <Input
          mt={2}
          ref={ref}
          borderColor="#718096"
          bgColor="#1F2937"
          {...props}
        />

        <FormErrorMessage fontSize="sm">{error}</FormErrorMessage>
      </FormControl>
    );
  }
);

TextField.displayName = "TextField";

export default CreateAccount;
