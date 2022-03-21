import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountLayout from "components/layouts/account";
import Button from "components/widgets/Button";
import Link from "components/widgets/Link";
import TextField from "components/widgets/TextField";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ForgotPassword = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Recover Account</title>
      </Head>

      <AccountLayout
        heading="Forgot Password"
        backgroundUrl="/assets/bg/forgot-password.png"
      >
        <ForgotPasswordForm />

        <Center mt={12} fontSize="sm">
          <HStack spacing={1}>
            <Box>Remember your password?</Box>
            <Link href="/login">Log in</Link>
          </HStack>
        </Center>
      </AccountLayout>
    </>
  );
};

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {});

  return (
    <Box as="form" noValidate onSubmit={onSubmit}>
      <VStack spacing={4}>
        <TextField
          type="email"
          label="Email"
          placeholder="Enter email"
          error={formState.errors.email?.message}
          {...register("email")}
        />
      </VStack>

      <Button type="submit" size="lg" fontSize="sm" mt={6} w="full">
        Send password reset link
      </Button>
    </Box>
  );
};

export default ForgotPassword;
