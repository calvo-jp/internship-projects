import { Box, HStack, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import AccountLayout from "components/layouts/account";
import Button from "components/widgets/Button";
import Link from "components/widgets/Link";
import TextField from "components/widgets/TextField";
import { signIn } from "next-auth/react";
import Head from "next/head";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Login = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pokedex | Log in</title>
      </Head>

      <AccountLayout heading="Log in" backgroundUrl="/assets/bg/sign-in.png">
        <LoginForm />

        <Box mt={12}>
          <Links />
        </Box>
      </AccountLayout>
    </React.Fragment>
  );
};

const schema = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().required(),
});

const LoginForm = () => {
  const { register, formState, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setLoginError] = React.useState(false);

  const login = handleSubmit(async (data) => {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });

    setLoginError(true);
  });

  return (
    <Box as="form" onSubmit={login}>
      <VStack spacing={4}>
        {(["email", "password"] as const).map((textfield) => (
          <TextField
            key={textfield}
            label={textfield}
            placeholder={"Enter " + textfield}
            error={formState.errors[textfield]?.message}
            {...register(textfield)}
          />
        ))}
      </VStack>

      <Button type="submit" size="lg" fontSize="sm" mt={6} w="full">
        Sign In
      </Button>
    </Box>
  );
};

const Links = () => {
  return (
    <VStack spacing={2} fontSize="sm">
      <Link href="/account-recovery">Forgot Password</Link>

      <HStack>
        <Box>Don&apos;t have an account?</Box>
        <Link href="/create-account">Sign up</Link>
      </HStack>
    </VStack>
  );
};

export default Login;
