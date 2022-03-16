import { Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "components/Link";
import Button from "components/widgets/Button";
import TextField from "components/widgets/TextField";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Login = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Log in</title>
      </Head>

      <Flex minH="100vh">
        <Box h="100vh" w="600px" maxW="40%" pos="relative">
          <Image
            src="/assets/bg/sign-in.png"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
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

        <Button size="lg" fontSize="sm" mt={6} w="full">
          Sign In
        </Button>
      </Box>

      <VStack spacing={2} mt={12} fontSize="sm">
        <Link href="/account-recovery">Forgot Password</Link>

        <HStack>
          <Box>Don&apos;t have an account?</Box>
          <Link href="/create-account">Sign up</Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
