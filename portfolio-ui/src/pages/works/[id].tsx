import { Box, Flex, Heading, Image, Tag, Text } from "@chakra-ui/react";
import Layout from "components/Layout";
import Head from "next/head";

const Work = () => {
  return (
    <>
      <Head>
        <title>Works | Designing Dashboards with usability in mind</title>
      </Head>

      <Layout>
        <Section1 />
        <Section2 />
      </Layout>
    </>
  );
};

const Section1 = () => {
  return (
    <Box as="section">
      <Box>
        <Heading
          as="h1"
          maxW="505px"
          fontSize={{ base: "3xl", lg: "4xl" }}
          fontWeight="bold"
        >
          Designing Dashboards with usability in mind
        </Heading>

        <Flex
          mt={{ base: 6, lg: 8 }}
          gap={6}
          align="flex-start"
          fontSize={{ base: "lg", lg: "xl" }}
        >
          <Tag
            bgColor="brand.maroon"
            rounded="full"
            color="brand.white"
            py={1}
            px={2}
          >
            2020
          </Tag>

          <Text>Dashboard, User Experience, Design</Text>
        </Flex>

        <Text mt={6}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </Text>
      </Box>

      <Box mt={{ base: 6, lg: 12 }}>
        <Image alt="" src="/images/attachments/ui.png" />
      </Box>
    </Box>
  );
};

const Section2 = () => {
  return (
    <Box as="section" mt={{ base: 8, lg: 14 }}>
      <Heading fontSize={{ base: "3xl", lg: "4xl" }} fontWeight={500}>
        Heading 1
      </Heading>

      <Heading
        as="h3"
        fontSize={{ base: "xl", lg: "2xl" }}
        fontWeight="medium"
        mt={2}
      >
        Heading 2
      </Heading>

      <Text mt={4}>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit. Exercitation
        veniam consequat sunt nostrud amet.
      </Text>

      <Box mt={{ base: 6, lg: 8 }}>
        <Image alt="" src="/images/attachments/car.png" />
      </Box>

      <Box mt={{ base: 6, lg: 8 }}>
        <Image alt="" src="/images/attachments/date-picker.png" />
      </Box>
    </Box>
  );
};

export default Work;
