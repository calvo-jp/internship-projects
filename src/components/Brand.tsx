import { Box, Center, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface BrandProps {
  dark?: boolean;
  small?: boolean;
}

const Brand = ({ small, dark }: BrandProps) => {
  return (
    <Link href="/" passHref>
      <Center as="a">
        <Flex gap={small ? 4 : 6} align="center">
          <Image src="/images/logo.png" alt="" h={small ? 50 : 70} />

          <Box color={dark ? "white" : "inherit"}>
            <Heading fontSize="3xl" fontWeight="bold" lineHeight={1}>
              Shelter
            </Heading>

            <Text color={dark ? "inherit" : "gray.500"}>Help Animals</Text>
          </Box>
        </Flex>
      </Center>
    </Link>
  );
};

export default Brand;
