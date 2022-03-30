import { useMutation } from "@apollo/client";
import { Box, Center, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountLayout from "components/layouts/account";
import Alert from "components/widgets/Alert";
import Button from "components/widgets/Button";
import Link from "components/widgets/Link";
import TextField from "components/widgets/TextField";
import { TRIGGER_PASSWORD_RESET } from "graphql/auth-api/mutations";
import Head from "next/head";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  TriggerPasswordReset,
  TriggerPasswordResetVariables,
} from "__generated__/TriggerPasswordReset";

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
  const { register, formState, handleSubmit, ...form } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const [triggerPswdReset, { loading, data, error, reset }] = useMutation<
    TriggerPasswordReset,
    TriggerPasswordResetVariables
  >(TRIGGER_PASSWORD_RESET, {
    context: {
      client: "auth",
    },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    await triggerPswdReset({ variables: { email } });
    form.reset();
  });

  return (
    <Box as="form" noValidate onSubmit={onSubmit}>
      <VStack spacing={4}>
        <Alert
          open={!!data && data.triggerPasswordReset}
          message="Reset password link has been sent. Please check your email"
          variant="success"
          onClose={reset}
        />

        <Alert
          open={!!error}
          message={error?.message}
          variant="error"
          onClose={reset}
        />

        <TextField
          type="email"
          label="Email"
          placeholder="Enter email"
          error={formState.errors.email?.message}
          {...register("email")}
        />
      </VStack>

      <Button
        w="full"
        mt={6}
        size="lg"
        type="submit"
        fontSize="sm"
        isLoading={loading}
      >
        Send password reset link
      </Button>
    </Box>
  );
};

export default ForgotPassword;
