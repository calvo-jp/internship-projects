import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CloseButton,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/Button";
import TextField from "components/TextField";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface Credential {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(25).required(),
});

const Login = () => {
  const { replace } = useRouter();
  const { status } = useSession();

  const { handleSubmit, register, formState } = useForm<Credential>({
    resolver: yupResolver(schema),
  });

  const [loginError, setLoginError] = useState<boolean>();

  const login = handleSubmit(async (data) => {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/admin/dashboard",
    });

    setLoginError(true);
  });

  useEffect(() => {
    return () => setLoginError(false);
  }, []);

  if (status === "loading") return null;

  if (status === "authenticated") {
    replace("/dashboard");
    return null;
  }

  return (
    <>
      <Head>
        <title>NextJS Auth | Login</title>
      </Head>

      <Flex minH="100vh" flexDir="column" justify="center" pt={24} pb={8}>
        <Box>
          <Box maxW="400px" p={{ base: 2, md: 4 }} mx="auto">
            <Brand />

            <Box mt={16}>
              <LoginError
                open={loginError}
                message="Invalid username or password"
                onClose={() => setLoginError(false)}
              />

              <form noValidate onSubmit={login}>
                <TextField
                  placeholder="email"
                  autoFocus
                  isRequired
                  {...register("email")}
                />

                <Box w="full" mt={4}>
                  <TextField
                    type="password"
                    placeholder="password"
                    isRequired
                    {...register("password")}
                  />

                  <Link href="/forgot-password" passHref>
                    <Box
                      as="a"
                      mt={2}
                      display="block"
                      fontSize="xs"
                      tabIndex={-1}
                    >
                      Forgot Password
                    </Box>
                  </Link>
                </Box>

                <Button type="submit" w="full">
                  Login
                </Button>
              </form>

              <Box mt={8}>
                <Text textAlign="center" fontSize="sm" color="gray.600">
                  or login using
                </Text>

                <Center mt={8}>
                  <Socials />
                </Center>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

interface LoginErrorProps {
  open?: boolean;
  message: string;
  onClose?: () => void;
}

const LoginError = ({ open, onClose, message }: LoginErrorProps) => {
  return (
    <Collapse in={open} animateOpacity>
      <Alert status="error" mb={4} fontSize="sm">
        <AlertIcon />
        <AlertTitle>Error:</AlertTitle>
        <AlertDescription flexGrow={1}>{message}</AlertDescription>
        <CloseButton ml={2} onClick={onClose} />
      </Alert>
    </Collapse>
  );
};

const socialMedias = ["facebook", "twitter", "linkedin"] as const;
type SocialMedia = typeof socialMedias[number];

const Socials = () => {
  const handleLoginWithSocialMedia = (socmed: SocialMedia) => {
    return () => {
      signIn(socmed, {
        callbackUrl: "/admin/dashboard",
        redirect: false,
      });
    };
  };

  return (
    <Wrap spacing={2}>
      {socialMedias.map((provider) => (
        <WrapItem key={provider} onClick={handleLoginWithSocialMedia(provider)}>
          <IconButton
            aria-label=""
            rounded="full"
            bgColor="transparent"
            icon={
              <Image
                w={10}
                h={10}
                src={`/images/socials/${provider}.png`}
                alt=""
              />
            }
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};

const Brand = () => {
  return (
    <Link href="/" passHref>
      <Center as="a">
        <Flex gap={4} align="center">
          <Image src="/images/logo.png" alt="" h="65px" />

          <Box>
            <Heading fontSize="3xl">Shelter</Heading>
            <Text color="gray.600">Help Animals</Text>
          </Box>
        </Flex>
      </Center>
    </Link>
  );
};

export default Login;
