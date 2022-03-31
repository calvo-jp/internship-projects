import { Box, Flex, Heading } from "@chakra-ui/react";
import useCallbackUrlQuery from "hooks/useCallbackUrlQuery";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

interface AccountLayoutProps {
  heading: string;
  backgroundUrl: string;
}

/**
 *
 * Base layout of pages related to account eg. Login, etc.
 * this handles redirection out-of-the-box for authenticated users
 *
 */
const AccountLayout = ({
  heading,
  backgroundUrl,
  children,
}: PropsWithChildren<AccountLayoutProps>) => {
  const { status } = useSession();
  const { push, prefetch } = useRouter();
  const callbackUrl = useCallbackUrlQuery();

  useEffect(() => {
    prefetch(callbackUrl);
  }, [callbackUrl, prefetch]);

  // returning null if status is authenticated or loading
  // causes unwanted behavior.
  // we just let content be visible here and
  // will handle authenticated or loading status
  // on the actual page eg. disabling button when loading or authenticated
  if (status === "authenticated") push(callbackUrl);

  return (
    <Flex minH="100vh">
      <Box
        w="600px"
        maxW="40%"
        alignSelf="stretch"
        display={{ base: "none", lg: "block" }}
      >
        <BackgroundImage src={backgroundUrl} />
      </Box>

      <Flex flexGrow={1} p={4} direction="column" justify="center">
        <Box w="full" maxW="400px" mx="auto" pt={24} pb={12}>
          <Heading as="h1" fontSize="5xl">
            {heading}
          </Heading>

          <Box mt={8}>{children}</Box>
        </Box>
      </Flex>
    </Flex>
  );
};

const BackgroundImage = ({ src }: { src: string }) => {
  return (
    <Box w="full" h="full" pos="relative">
      <Image
        src={src}
        alt=""
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
    </Box>
  );
};

export default AccountLayout;
