import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface AccountLayoutProps {
  heading: string;
  backgroundUrl: string;
}

const AccountLayout = ({
  heading,
  backgroundUrl,
  children,
}: PropsWithChildren<AccountLayoutProps>) => {
  return (
    <Flex minH="100vh">
      <Box alignSelf="stretch" w="600px" maxW="40%">
        <BackgroundImage src={backgroundUrl} />
      </Box>

      <Flex flexGrow={1} p={4} direction="column" justify="center">
        <Box w="full" maxW="400px" mx="auto">
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
