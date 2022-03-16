import {
  Box,
  Flex,
  Heading,
  HStack,
  Tab,
  TabList,
  Tabs,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Layout from "components/layout";
import Head from "next/head";
import Image from "next/image";

const Pokemon = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Pikachu</title>
      </Head>

      <Layout>
        <Box>
          <HStack p={16} spacing={16} align="start">
            <LeftPane />
            <RightPane />
          </HStack>
        </Box>
      </Layout>
    </>
  );
};

const LeftPane = () => {
  return (
    <VStack>
      <Box pos="relative" h="390px" w="325px" rounded="md" overflow="hidden">
        <Image
          alt=""
          src="/assets/samples/1.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>
    </VStack>
  );
};

const RightPane = () => {
  return (
    <Box>
      <VStack spacing={6} align="start">
        <Heading>Pikachu</Heading>
        <Tag
          bgColor="brand.red.500"
          color="brand.gray.50"
          rounded="full"
          py={2}
          px={4}
        >
          Fire Type
        </Tag>
      </VStack>

      <Tabs mt={14} variant="unstyled">
        <TabList gap={4}>
          {["About", "Statistics", "Evolution", "Moves"].map((tab) => (
            <Tab
              key={tab}
              bgColor="brand.gray.800"
              color="brand.gray.50"
              rounded="sm"
              w="180px"
              _selected={{
                color: "brand.gray.800",
                bgColor: "brand.primary",
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Text mt={12}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        reprehenderit, dolorem maiores vero incidunt reiciendis! Enim animi ad,
        pariatur sunt nemo eos nulla veniam suscipit aliquam tempora?
        Praesentium, possimus perspiciatis.
      </Text>
    </Box>
  );
};

export default Pokemon;
