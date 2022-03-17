import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import HomepageLayout from "components/layouts/homepage";
import Head from "next/head";
import Image from "next/image";
import { PropsWithChildren } from "react";

const Pokemon = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Pikachu</title>
      </Head>

      <HomepageLayout>
        <Box p={{ lg: 20 }} pb={{ lg: 24 }}>
          <Flex gap={16} w="fit-content" mx="auto">
            <LeftPane />
            <RightPane />
          </Flex>
        </Box>
      </HomepageLayout>
    </>
  );
};

const LeftPane = () => {
  return (
    <VStack spacing={12}>
      <Box pos="relative" h="390px" w="325px" rounded="md" overflow="hidden">
        <Image
          alt=""
          src="/assets/samples/1.png"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </Box>

      <Box>
        <SimpleGrid columns={3} columnGap={2} rowGap={4}>
          {Array(6)
            .fill(1)
            .map((v, i) => v + i)
            .map((v) => (
              <Box
                key={v}
                pos="relative"
                w="57px"
                h="57px"
                rounded="sm"
                overflow="hidden"
              >
                <Image
                  src={`/assets/samples/${v}.png`}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </Box>
            ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

const RightPane = () => {
  return (
    <Box maxW="800">
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
              fontWeight="medium"
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

        <TabPanels>
          <TabPanel p={0}>
            <Box pt={12}>
              <About />
            </Box>
          </TabPanel>
          <TabPanel p={0}>
            <Box pt={16}>
              <Statistics />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const Statistics = () => {
  return null;
};

const About = () => {
  return (
    <VStack mt={12} spacing={8} align="start">
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin
        mauris tempus consectetur arcu maecenas id mauris pretium. Integer
        laoreet morbi cursus consectetur. Ipsum turpis id quisque morbi est in
        id nibh sagittis. Ipsum ornare quam vitae praesent.
      </Text>

      <Card>
        <StatGroup gap={6} alignItems="center">
          {[
            ["Weight", "220.0 KG"],
            ["Height", "220.0 KG"],
          ].map(([label, value], idx, arr) => (
            <>
              <Stat key={label}>
                <StatLabel color="brand.blue.400" fontWeight="semibold">
                  {label}
                </StatLabel>

                <StatHelpText mt={2} mb={0} color="brand.gray.50">
                  {value}
                </StatHelpText>
              </Stat>

              {idx + 1 < arr.length && (
                <Divider orientation="vertical" h="60px" my="auto" />
              )}
            </>
          ))}
        </StatGroup>
      </Card>

      <Card>
        <Stat>
          <StatLabel color="brand.blue.400" fontWeight="semibold">
            Breed
          </StatLabel>

          <Wrap spacing={8} mt={3}>
            {[
              ["Gender", "87.8% Male"],
              ["Egg Group", "Monster"],
              ["Egg Cycle", "Grass"],
            ].map(([label, value]) => (
              <WrapItem key={label}>
                <Text color="brand.gray.400">{label}:</Text>
                <Text color="brand.gray.50" ml={1}>
                  {value}
                </Text>
              </WrapItem>
            ))}
          </Wrap>
        </Stat>
      </Card>
    </VStack>
  );
};

const Card = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      py={6}
      px={8}
      border="1px"
      borderColor="brand.gray.500"
      bgColor="brand.gray.800"
      w="fit-content"
      rounded="sm"
      fontSize="md"
    >
      {children}
    </Box>
  );
};

export default Pokemon;
