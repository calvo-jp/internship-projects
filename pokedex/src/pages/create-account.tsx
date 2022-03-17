import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountLayout from "components/layouts/account";
import Link from "components/Link";
import Button from "components/widgets/Button";
import TextField from "components/widgets/TextField";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().trim().required(),
  })
  .required();

const CreateAccount = () => {
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signup = handleSubmit(async (data) => {});

  return (
    <>
      <Head>
        <title>Pokedex | Create Account</title>
      </Head>

      <AccountLayout heading="Sign up" backgroundUrl="/assets/bg/sign-up.png">
        <Box as="form" onSubmit={signup}>
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
      </AccountLayout>
    </>
  );
};

export default CreateAccount;
