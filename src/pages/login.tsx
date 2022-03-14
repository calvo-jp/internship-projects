import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Collapse,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Brand from "components/Brand";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
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
      ...data,
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
    replace("/admin/dashboard");
    return null;
  }

  return (
    <>
      <Head>
        <title>NextJS Auth | Login</title>
      </Head>

      <Wrapper>
        <Brand />

        <Box mt={16}>
          <LoginError
            open={loginError}
            message="Invalid username or password"
            onClose={() => setLoginError(false)}
          />

          <form noValidate onSubmit={login} autoComplete="off">
            <FormControl isInvalid={!!formState.errors.email}>
              <Input
                px={4}
                py={6}
                rounded="sm"
                placeholder="email"
                autoFocus
                isRequired
                {...register("email")}
              />
              <FormErrorMessage>
                {formState.errors.email?.message}
              </FormErrorMessage>
            </FormControl>

            <Box w="full" mt={4}>
              <FormControl isInvalid={!!formState.errors.password}>
                <Input
                  px={4}
                  py={6}
                  rounded="sm"
                  type="password"
                  placeholder="password"
                  isRequired
                  {...register("password")}
                />

                <FormErrorMessage>
                  {formState.errors.password?.message}
                </FormErrorMessage>
              </FormControl>

              <Link href="/forgot-password" passHref>
                <Box as="a" mt={2} display="block" fontSize="xs" tabIndex={-1}>
                  Forgot Password
                </Box>
              </Link>
            </Box>

            <Button
              type="submit"
              w="full"
              p={6}
              mt={8}
              bgColor="brand.red"
              color="white"
              rounded="sm"
              transition="background 300ms ease-in-out"
              _hover={{ bgColor: "black" }}
              _focus={{ bgColor: "black", boxShadow: "none" }}
            >
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
      </Wrapper>
    </>
  );
};

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex minH="100vh" flexDir="column" justify="center" pt={24} pb={8}>
      <Box>
        <Box maxW="400px" p={{ base: 2, md: 4 }} mx="auto">
          {children}
        </Box>
      </Box>
    </Flex>
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

export default Login;
