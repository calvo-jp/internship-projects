import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/widgets/Button";
import TextField from "components/widgets/TextField";
import Head from "next/head";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Login = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Log in</title>
      </Head>

      <Flex minH="100vh">
        <Box h="100vh" w="40%">
          <BackgroundImage />
        </Box>

        <Flex flexGrow={1} p={4} direction="column" justify="center">
          <Box>
            <Box maxW="400px" mx="auto">
              <LoginForm />
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
      bgImage="url(/assets/bg/sign-in.png)"
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

const LoginForm = () => {
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
      <Heading as="h1" fontSize="5xl">
        Log in
      </Heading>

      <Box as="form" mt={8}>
        <VStack spacing={4}>
          <TextField
            label="Email"
            placeholder="Enter email"
            error={formState.errors.email?.message}
            {...register("email")}
          />

          <TextField
            label="Password"
            placeholder="Enter Password"
            error={formState.errors.password?.message}
            {...register("password")}
          />
        </VStack>

        <Button mt={6} w="full">
          Sign In
        </Button>
      </Box>

      <Center mt={12}>
        <NextLink passHref href="/account-recovery">
          <Link fontSize="sm" color="brand.primary">
            Forgot Password
          </Link>
        </NextLink>
      </Center>

      <Center mt={2} fontSize="sm">
        <HStack>
          <Box>Don&apos;t have an account?</Box>
          <NextLink passHref href="/create-account">
            <Link color="brand.primary">Sign up</Link>
          </NextLink>
        </HStack>
      </Center>
    </Box>
  );
};

export default Login;
