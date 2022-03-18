import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
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
import {
  ArrowNarrowRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import HomepageLayout from "components/layouts/homepage";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import CardTable from "components/widgets/card/CardTable";
import CardTag from "components/widgets/card/CardTag";
import IconButton from "components/widgets/IconButton";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import * as React from "react";

const Pokemon = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Pokedex | Pikachu</title>
      </Head>

      <HomepageLayout>
        <Box w="fit-content" mx="auto" p={6} pb={20}>
          <Tree />

          <Flex gap={16} mt={14} direction={{ base: "column", lg: "row" }}>
            <LeftPane />

            <Box w={{ xl: "799px", base: "auto" }}>
              <RightPane />
            </Box>
          </Flex>
        </Box>
      </HomepageLayout>
    </React.Fragment>
  );
};

const Tree = () => {
  return (
    <HStack fontSize="sm" spacing={3}>
      <NextLink href="/pokemons" passHref>
        <Text as="a" color="brand.gray.500">
          Home
        </Text>
      </NextLink>

      <Icon stroke="brand.gray.400" as={ChevronRightIcon} />
      <Text color="brand.gray.50">Pokemon details</Text>
    </HStack>
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

      <HStack spacing={5}>
        <IconButton icon={ChevronLeftIcon} />

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

        <IconButton icon={ChevronRightIcon} active />
      </HStack>
    </VStack>
  );
};

const RightPane = () => {
  return (
    <Box>
      <VStack spacing={6} align={{ base: "center", lg: "start" }}>
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

      <Tabs mt={16} variant="unstyled">
        <TabList gap={4} flexWrap="wrap">
          {["About", "Statistics", "Evolution", "Moves"].map((tab) => (
            <Tab
              key={tab}
              fontWeight="medium"
              bgColor="brand.gray.800"
              color="brand.gray.50"
              rounded="sm"
              w="187px"
              _selected={{
                color: "brand.gray.800",
                bgColor: "brand.primary",
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels mt={14}>
          {[About, Statistics, Evolution, Moves].map((Component, idx) => (
            <TabPanel p={0} key={idx}>
              <Component />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const Moves = () => {
  return (
    <VStack spacing={8}>
      <Card w="full">
        <SimpleGrid columns={2}>
          <Box>
            <VStack spacing={6} align="start">
              <CardHeading>Quick Moves</CardHeading>
              <CardTag variant="info">Ember</CardTag>
              <CardTag variant="info">Fire Spin</CardTag>
            </VStack>
          </Box>

          <Box>
            <CardTable
              headings={["Damage", "DPS", "EPS"]}
              data={[
                [10, 10, 10],
                [14, 9.1, 6.4],
              ]}
            />
          </Box>
        </SimpleGrid>
      </Card>

      <Card w="full">
        <SimpleGrid columns={2}>
          <Box>
            <VStack spacing={6} align="start">
              <CardHeading>Quick Moves</CardHeading>

              {["Fireblast", "Flame Thrower", "Heat wave", "Overheat"].map(
                (value) => (
                  <CardTag variant="info" key={value}>
                    {value}
                  </CardTag>
                )
              )}
            </VStack>
          </Box>

          <Box>
            <CardTable
              headings={["Damage", "DPS", "EPS"]}
              data={[
                [10, 10, 10],
                [14, 9.1, 6.4],
                [12, 6.5, 8],
                [13, 3, 8],
              ]}
            />
          </Box>
        </SimpleGrid>
      </Card>
    </VStack>
  );
};

const Evolution = () => {
  return (
    <Box>
      <Text maxW="403px" fontSize="sm">
        There are currently a total of 9 Pokémon in the Eevee family. Flareon
        evolves from Eevee which costs{" "}
        <Text as="b" fontWeight="semibold">
          25 Candy.
        </Text>
      </Text>

      <Card mt={4} w="full">
        <VStack spacing={6}>
          {Array(6)
            .fill(null)
            .map((_, idx) => (
              <Center key={idx}>
                <HStack spacing={{ base: 12, md: 24, lg: 44 }}>
                  <VStack spacing={2}>
                    <Box
                      w="88px"
                      h="88px"
                      bgColor="brand.inconsistent.gray.800"
                      rounded="md"
                    />
                    <Text fontSize="sm">Eevee</Text>
                  </VStack>

                  <Box>
                    <Icon
                      as={ArrowNarrowRightIcon}
                      stroke="brand.primary"
                      fontSize="2xl"
                    />

                    <Text>25</Text>
                  </Box>
                  <VStack spacing={2}>
                    <Box
                      w="88px"
                      h="88px"
                      bgColor="brand.inconsistent.gray.800"
                      rounded="md"
                    />
                    <Text fontSize="sm">Flareon</Text>
                  </VStack>
                </HStack>
              </Center>
            ))}
        </VStack>
      </Card>
    </Box>
  );
};

const Statistics = () => {
  const stats = [
    { label: "HP", value: 20, colorScheme: "brand.rose" },
    { label: "ATK", value: 30, colorScheme: "brand.amber" },
    { label: "DEF", value: 40, colorScheme: "brand.teal" },
    { label: "SPD", value: 12, colorScheme: "brand.purple" },
    { label: "EXP", value: 90, colorScheme: "brand.gray" },
  ];

  return (
    <VStack spacing={16} align="start">
      <Card w="full">
        {stats.map(({ label, value, colorScheme }) => (
          <Flex align="center" fontWeight="medium" key={label}>
            <Text w="45px">{label}</Text>

            <Progress
              colorScheme={colorScheme}
              size="xs"
              flexGrow="1"
              ml={8}
              mr={4}
              value={value}
              rounded="sm"
            />

            <Text w="35px">{value}%</Text>
          </Flex>
        ))}
      </Card>

      <Card w="full">
        <CardHeading>Weaknesses</CardHeading>

        <Flex mt={6} wrap="wrap" rowGap={4} columnGap={8}>
          {["Rock", "Ground", "Water"].map((weakness) => (
            <HStack spacing={6} key={weakness}>
              <CardTag variant="error">{weakness}</CardTag>

              <Text>
                <Box as="span" color="brand.red.500" mr={1}>
                  160%
                </Box>

                <Box as="span">damage</Box>
              </Text>
            </HStack>
          ))}
        </Flex>
      </Card>

      <Card w="full">
        <CardHeading>Resistant</CardHeading>

        <Flex mt={6} wrap="wrap" rowGap={4} columnGap={8}>
          {Array(6)
            .fill(null)
            .map((_, idx) => (
              <HStack spacing={6} key={idx}>
                <CardTag variant="success">Bug</CardTag>

                <Text>
                  <Box as="span" color="brand.green.500" mr={1}>
                    65%
                  </Box>

                  <Box as="span">damage</Box>
                </Text>
              </HStack>
            ))}
        </Flex>

        <Flex mt={5} justify="right">
          <Button
            p={0}
            m={0}
            h="fit-content"
            bgColor="transparent"
            rightIcon={<Icon as={ChevronDownIcon} />}
            fontWeight="normal"
            fontSize="sm"
            color="brand.primary"
          >
            See more
          </Button>
        </Flex>
      </Card>
    </VStack>
  );
};

const About = () => {
  return (
    <VStack spacing={8} align="start">
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin
        mauris tempus consectetur arcu maecenas id mauris pretium. Integer
        laoreet morbi cursus consectetur. Ipsum turpis id quisque morbi est in
        id nibh sagittis. Ipsum ornare quam vitae praesent.
      </Text>

      <Card py={4}>
        <HStack
          gap={6}
          divider={
            <Divider
              h="75px"
              orientation="vertical"
              borderColor="brand.gray.700"
            />
          }
        >
          {[
            ["Weight", "220.0 KG"],
            ["Height", "220.0 KG"],
          ].map(([label, value]) => (
            <VStack key={label} spacing={2} align="start">
              <CardHeading>{label}</CardHeading>

              <Text color="brand.gray.50">{value}</Text>
            </VStack>
          ))}
        </HStack>
      </Card>

      <Card>
        <CardHeading>Breed</CardHeading>

        <Wrap mt={3} spacing={8}>
          {[
            ["Gender", "87.8% Male"],
            ["Egg Group", "Monster"],
            ["Egg Cycle", "Grass"],
          ].map(([label, value]) => (
            <WrapItem key={label}>
              <Text color="brand.gray.400">{label}:</Text>
              <Text color="brand.gray.50" ml={2}>
                {value}
              </Text>
            </WrapItem>
          ))}
        </Wrap>
      </Card>
    </VStack>
  );
};

export default Pokemon;
