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
import Button from "components/Button";
import TextField from "components/TextField";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const socialMedias = ["facebook", "twitter", "linkedin"] as const;
type SocialMedia = typeof socialMedias[number];

interface Credential {
  email: string;
  password: string;
}

const Login = () => {
  const { replace, push } = useRouter();
  const { status } = useSession();

  const [loginError, setLoginError] = useState<boolean>();
  const [credential, setCredential] = useState<Credential>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      ...credential,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    setLoginError(true);
  };

  const handleLoginWithSocialMedia = (socmed: SocialMedia) => {
    return () => signIn(socmed, { callbackUrl: "/dashboard", redirect: false });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredential((o) => ({ ...o, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    return () => {
      setLoginError(false);
      setCredential({ email: "", password: "" });
    };
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

      <Flex minH="100vh" flexDir="column" justify="center" py={24}>
        <Box>
          <Box maxW="400px" p={{ base: 2, md: 4 }} mx="auto">
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

            <Box mt={16}>
              <Collapse in={!!loginError} animateOpacity>
                <Alert status="error" mb={4}>
                  <AlertIcon />
                  <AlertTitle>Error:</AlertTitle>
                  <AlertDescription>
                    Invalid username or password
                  </AlertDescription>
                  <CloseButton onClick={() => setLoginError(false)} />
                </Alert>
              </Collapse>

              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  name="email"
                  placeholder="email"
                  value={credential.email}
                  onChange={handleChange}
                  autoFocus
                  isRequired
                />

                <Box w="full" mt={4}>
                  <TextField
                    mb={2}
                    type="password"
                    name="password"
                    placeholder="password"
                    value={credential.password}
                    onChange={handleChange}
                    isRequired
                  />

                  <Link href="/forgot-password" passHref>
                    <Box as="a" fontSize="xs" tabIndex={-1}>
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
                  <Wrap spacing={2}>
                    {socialMedias.map((provider) => (
                      <WrapItem
                        key={provider}
                        onClick={handleLoginWithSocialMedia(provider)}
                      >
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
                </Center>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
