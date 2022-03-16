import { Box, Center, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "components/Link";
import Button from "components/widgets/Button";
import TextField from "components/widgets/TextField";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const CreateAccount = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Create Account</title>
      </Head>

      <Flex minH="100vh">
        <Box h="100vh" w="600px" maxW="40%" pos="relative">
          <Image
            src="/assets/bg/sign-up.png"
            alt=""
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
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
      <Heading as="h1" fontSize="5xl">
        Sign up
      </Heading>

      <Box as="form" mt={8}>
        <VStack spacing={4}>
          <TextField
            size="lg"
            fontSize="sm"
            label="Email"
            placeholder="Enter email"
            error={formState.errors.email?.message}
            {...register("email")}
          />

          <TextField
            size="lg"
            fontSize="sm"
            label="Password"
            placeholder="Enter Password"
            error={formState.errors.password?.message}
            {...register("password")}
          />
        </VStack>

        <Button size="lg" fontSize="sm" mt={6} w="full">
          Create Account
        </Button>
      </Box>

      <Center mt={12} fontSize="sm">
        <HStack>
          <span>Already have an account?</span>
          <Link href="/login">Log in</Link>
        </HStack>
      </Center>
    </Box>
  );
};

export default CreateAccount;
