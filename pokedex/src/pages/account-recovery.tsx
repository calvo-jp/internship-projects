import { useMutation } from "@apollo/client";
import { Box, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountLayout from "components/layouts/account";
import Alert from "components/widgets/Alert";
import Button from "components/widgets/Button";
import TextField from "components/widgets/TextField";
import { RESET_PASSWORD } from "graphql/auth-api/mutations";
import useSearchParams from "hooks/useSearchParams";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  ResetPassword,
  ResetPasswordVariables,
} from "__generated__/ResetPassword";

const AccountRecovery = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pokedex | Recover Account</title>
      </Head>

      <AccountLayout
        heading="Recover Account"
        backgroundUrl="/assets/bg/forgot-password.png"
      >
        <AccountRecoveryForm />
      </AccountLayout>
    </React.Fragment>
  );
};

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .min(5, "Password must be 5 or more characters")
    .max(100, "Password must not be more than 100 charaters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords don't match")
    .required("Confirm your password"),
});

const AccountRecoveryForm = () => {
  const router = useRouter();
  const params = useSearchParams("email", "code");
  const code = params.get("code");
  const email = params.get("email");

  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [resetPassword, { loading, error, reset }] = useMutation<
    ResetPassword,
    ResetPasswordVariables
  >(RESET_PASSWORD, {
    context: {
      client: "auth",
    },
  });

  // this fixes vercel issue about
  // not being able to use router when pre-rendering
  React.useEffect(() => {
    if (!(email && code)) router.replace("/login");
  }, [code, email, router]);

  if (!(email && code)) return null;

  const onSubmit = handleSubmit(async ({ newPassword }) => {
    try {
      await resetPassword({
        variables: {
          code,
          newPassword,
        },
      });

      await signIn("credentials", {
        email,
        password: newPassword,
      });
    } catch {}
  });

  return (
    <Box as="form" noValidate onSubmit={onSubmit}>
      <VStack spacing={4} align="stretch">
        <Alert
          open={!!error}
          variant="error"
          message={error?.message}
          onClose={reset}
        />

        <TextField
          type="password"
          label="New Password"
          placeholder="Enter new password"
          error={formState.errors.newPassword?.message}
          {...register("newPassword")}
        />

        <TextField
          type="password"
          label="Confirm Password"
          placeholder="Enter new password"
          error={formState.errors.confirmPassword?.message}
          {...register("confirmPassword")}
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
        Submit
      </Button>
    </Box>
  );
};

export default AccountRecovery;
