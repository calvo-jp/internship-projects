import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountLayout from "components/layouts/account";
import Button from "components/widgets/Button";
import Link from "components/widgets/Link";
import TextField from "components/widgets/TextField";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const CreateAccount = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Create Account</title>
      </Head>

      <AccountLayout heading="Sign up" backgroundUrl="/assets/bg/sign-up.png">
        <CreateAccountForm />

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

const schema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .min(3, "First name must be 3 characters or more")
    .max(25, "First name must not be more than 25 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .trim()
    .min(3, "Last name must be 3 characters or more")
    .max(25, "Last name must not be more than 25 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(5, "Password must be 5 or more characters")
    .max(100, "Password must not be more than 100 charaters")
    .required("Password is required"),
});

const CreateAccountForm = () => {
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const signup = handleSubmit(async (data) => {});

  return (
    <Box as="form" onSubmit={signup} noValidate>
      <VStack spacing={4}>
        <TextField
          label="First name"
          placeholder="eg. John"
          error={formState.errors.firstName?.message}
          {...register("firstName")}
        />

        <TextField
          label="Last name"
          placeholder="eg. Doe"
          error={formState.errors.lastName?.message}
          {...register("lastName")}
        />

        <TextField
          type="email"
          label="Email"
          placeholder="eg. johndoe@domain.co"
          error={formState.errors.email?.message}
          {...register("email")}
        />

        <TextField
          type="password"
          label="Password"
          placeholder="eg. Password1!"
          error={formState.errors.password?.message}
          {...register("password")}
        />
      </VStack>

      <Button type="submit" size="lg" fontSize="sm" mt={6} w="full">
        Create Account
      </Button>
    </Box>
  );
};

export default CreateAccount;
