import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
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
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("malformed email")
      .trim()
      .required("email is required"),
    password: yup
      .string()
      .min(5, "password must be 5 or more characters")
      .max(50, "password must not be greater than 50 characters")
      .trim()
      .required("password is required"),
  })
  .required("username and password are required");

const Login = () => {
  const { replace } = useRouter();
  const { status } = useSession();

  const { handleSubmit, register, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
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
            mb={4}
            open={loginError}
            message="Invalid username or password"
            onClose={() => setLoginError(false)}
          />

          <VStack spacing={4} as="form" noValidate onSubmit={login}>
            {(["email", "password"] as const).map((textfield) => (
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

          <VStack mt={8} spacing={8}>
            <Center fontSize="sm" color="gray.600">
              or login using
            </Center>
            <Center>
              <Socials />
            </Center>
          </VStack>
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

const LoginError = ({
  open,
  onClose,
  message,
  ...all
}: LoginErrorProps & AlertProps) => {
  return (
    <Collapse in={open} animateOpacity>
      <Alert status="error" fontSize="sm" {...all}>
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
