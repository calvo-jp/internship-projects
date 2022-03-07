import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Wrapper from "components/Wrapper";
import Head from "next/head";

const Work = () => {
  return (
    <>
      <Head>
        <title>Works | Designing Dashboards with usability in mind</title>
      </Head>

      <Navbar />
      <Box as="main" maxW="650px" mx="auto" p={{ base: 4, lg: 8 }}>
        <Section1 />
        <Section2 />
      </Box>

      <Footer />
    </>
  );
};

const Section1 = () => {
  return (
    <Box as="section">
      <Box>
        <Heading fontSize={{ base: "30px", lg: "34px" }} as="h1" maxW="500px">
          Designing Dashboards with usability in mind
        </Heading>

        <Flex
          align="center"
          gap={4}
          mt={4}
          fontSize={{ base: "18px", lg: "20px" }}
        >
          <Badge
            bgColor="brand.maroon"
            rounded="full"
            color="brand.white"
            py={1}
            px={2}
          >
            2020
          </Badge>

          <Text fontWeight={400}>Dashboard, User Experience Design</Text>
        </Flex>

        <Text mt={4}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Text>
      </Box>

      <Box mt={8}>
        <Image alt="" src="/images/attachments/ui.png" />
      </Box>
    </Box>
  );
};

const Section2 = () => {
  return (
    <Box as="section" mt={16}>
      <Heading as="h2" fontSize={{ base: "26px", lg: "30px" }} fontWeight={500}>
        Heading 1
      </Heading>

      <Heading
        as="h3"
        fontSize={{ base: "20px", lg: "24px" }}
        fontWeight={500}
        mt={2}
      >
        Heading 2
      </Heading>

      <Text mt={4}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit. Exercitation
        veniam consequat sunt nostrud amet.
      </Text>

      <Box mt={4}>
        <Image alt="" src="/images/attachments/car.png" />
      </Box>

      <Box mt={4}>
        <Image alt="" src="/images/attachments/date-picker.png" />
      </Box>
    </Box>
  );
};

export default Work;
