import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FormEvent } from "react";

const Login = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>NextJS Auth0 | Login</title>
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
              <form onSubmit={handleSubmit}>
                <Input rounded="sm" px={4} py={6} placeholder="email" />

                <Box w="full" mt={4}>
                  <Input
                    rounded="sm"
                    px={4}
                    py={6}
                    placeholder="password"
                    mb={2}
                  />

                  <Link href="/forgot-password" passHref>
                    <Box as="a" fontSize="xs" tabIndex={-1}>
                      Forgot Password
                    </Box>
                  </Link>
                </Box>

                <Button
                  type="submit"
                  mt={8}
                  bgColor="brand.red"
                  rounded="sm"
                  color="white"
                  p={6}
                  w="full"
                >
                  Login
                </Button>
              </form>

              <Box mt={8}>
                <Text textAlign="center" fontSize="sm" color="gray.600">
                  or login using
                </Text>

                <Center mt={8}>
                  <Wrap>
                    <WrapItem>
                      <Image
                        w={8}
                        h={8}
                        src="/images/socials/google.png"
                        alt=""
                      />
                    </WrapItem>
                    <WrapItem>
                      <Image w={8} h={8} src="/images/socials/fb.png" alt="" />
                    </WrapItem>
                    <WrapItem>
                      <Image
                        w={8}
                        h={8}
                        src="/images/socials/twitter.png"
                        alt=""
                      />
                    </WrapItem>
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
