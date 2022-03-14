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
  IconButton,
  Image,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Brand from "components/Brand";
import Button from "components/widgets/Button";
import TextField from "components/widgets/TextField";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef, PropsWithChildren, useEffect, useState } from "react";
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

const textfields: (keyof Credential)[] = ["email", "password"];

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
        <Brand small />

        <Box mt={10}>
          <LoginError
            open={loginError}
            message="Invalid username or password"
            onClose={() => setLoginError(false)}
          />

          <VStack
            spacing={4}
            as="form"
            noValidate
            onSubmit={login}
            autoComplete="off"
          >
            {textfields.map((textfield) => (
              <TextField
                key={textfield}
                type={textfield}
                placeholder={textfield}
                error={formState.errors[textfield]?.message}
                {...register(textfield)}
              />
            ))}

            <Button type="submit" w="full">
              Login
            </Button>
          </VStack>

          <Box mt={8}>
            <Center fontSize="sm" color="gray.600">
              or login using
            </Center>
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
