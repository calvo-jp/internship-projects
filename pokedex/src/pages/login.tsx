import { Box, HStack, Icon, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import FacebookIcon from "components/icons/Facebook";
import LinkedInIcon from "components/icons/LinkedIn";
import TwitterIcon from "components/icons/Twitter";
import AccountLayout from "components/layouts/account";
import Alert from "components/widgets/Alert";
import Button from "components/widgets/Button";
import Link from "components/widgets/Link";
import TextField from "components/widgets/TextField";
import useCallbackUrlQuery from "hooks/useCallbackUrlQuery";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Login = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Log in</title>
      </Head>

      <AccountLayout heading="Log in" backgroundUrl="/assets/bg/sign-in.png">
        <LoginForm />
        <Box mt={10}>
          <Socials />
        </Box>
        <Box mt={8}>
          <Links />
        </Box>
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
  password: yup
    .string()
    .trim()
    .min(5, "Password must be 5 or more characters")
    .max(100, "Password must not be more than 100 charaters")
    .required("Password is required"),
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

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string>();

  const login = handleSubmit(async (data) => {
    setLoading(true);

    const response = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (response && response.error) setLoginError(response.error);

    setLoading(false);
  });

  useEffect(() => {
    return () => {
      setLoading(false);
      setLoginError(undefined);
    };
  }, []);

  return (
    <Box as="form" onSubmit={login} noValidate>
      <VStack spacing={4} align="stretch">
        <Alert
          open={!!loginError}
          variant="error"
          message={loginError}
          onClose={() => setLoginError(undefined)}
        />

        <TextField
          type="email"
          label="Email"
          placeholder="Enter email"
          error={formState.errors.email?.message}
          {...register("email")}
        />

        <TextField
          type="password"
          label="Password"
          placeholder="Enter password"
          error={formState.errors.password?.message}
          {...register("password")}
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
        Sign In
      </Button>
    </Box>
  );
};

const Links = () => {
  return (
    <VStack spacing={2} fontSize="sm">
      <Link href="/forgot-password">Forgot Password</Link>

      <HStack>
        <Box>Don&apos;t have an account?</Box>
        <Link href="/create-account">Sign up</Link>
      </HStack>
    </VStack>
  );
};

// index matters here
const providers = ["facebook", "twitter", "linkedin"] as const;
const providerIcons = [FacebookIcon, TwitterIcon, LinkedInIcon];

const Socials = () => {
  const callbackUrl = useCallbackUrlQuery();

  const handleLogin = (provider: typeof providers[number]) => {
    return async () => {
      await signIn(provider, {
        callbackUrl,
      });
    };
  };

  return (
    <HStack spacing={4} justify="center">
      {providers.map((provider, index) => (
        <button key={provider} onClick={handleLogin(provider)}>
          <Icon as={providerIcons[index]} fill="white" />
        </button>
      ))}
    </HStack>
  );
};

export default Login;
