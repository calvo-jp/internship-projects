import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Progress,
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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import HomepageLayout from "components/layouts/homepage";
import Card from "components/widgets/Card";
import IconButton from "components/widgets/IconButton";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

const Pokemon = () => {
  return (
    <>
      <Head>
        <title>Pokedex | Pikachu</title>
      </Head>

      <HomepageLayout>
        <Box pt={6} pb={20}>
          <Box w="fit-content" mx="auto">
            <Tree />

            <Flex gap={16} mt={14}>
              <LeftPane />

              <Box w="799px">
                <RightPane />
              </Box>
            </Flex>
          </Box>
        </Box>
      </HomepageLayout>
    </>
  );
};

const Tree = () => {
  return (
    <HStack fontSize="sm" spacing={3}>
      <Link href="/pokemons" passHref>
        <Text as="a" color="brand.gray.500">
          Home
        </Text>
      </Link>

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
  return null;
};

const Evolution = () => {
  return (
    <Box>
      <Text maxW="403px" fontSize="sm">
        There are currently a total of 9 Pokémon in the Eevee family. Flareon
        evolves from Eevee which costs{" "}
        <Text as="b" fontWeight="semibold">
          25 Candy
        </Text>
        .
      </Text>

      <Box mt={4}>
        <Card fullWidth></Card>
      </Box>
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
      <Card fullWidth>
        <Box>
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
        </Box>
      </Card>

      <Card fullWidth>
        <Text fontWeight="semibold" color="brand.blue.400">
          Weaknesses
        </Text>

        <Flex mt={6} wrap="wrap" rowGap={4} columnGap={8}>
          {["Rock", "Ground", "Water"].map((weakness) => (
            <HStack spacing={6} key={weakness}>
              <Tag
                py={2}
                px={8}
                color="brand.red.700"
                bgColor="brand.red.50"
                fontSize="xs"
              >
                {weakness}
              </Tag>

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

      <Card fullWidth>
        <Text fontWeight="semibold" color="brand.blue.400">
          Resistant
        </Text>

        <Flex mt={6} wrap="wrap" rowGap={4} columnGap={8}>
          {Array(6)
            .fill(null)
            .map((_, idx) => (
              <HStack spacing={6} key={idx}>
                <Tag
                  py={2}
                  px={8}
                  color="brand.green.700"
                  bgColor="brand.green.50"
                  fontSize="xs"
                >
                  Bug
                </Tag>

                <Text>
                  <Box as="span" color="brand.green.500" mr={1}>
                    65%
                  </Box>

                  <Box as="span">damage</Box>
                </Text>
              </HStack>
            ))}
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

      <Card>
        <StatGroup gap={6} alignItems="center">
          {[
            ["Weight", "220.0 KG"],
            ["Height", "220.0 KG"],
          ].map(([label, value], idx, arr) => (
            <Fragment key={label}>
              <Stat>
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
            </Fragment>
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

export default Pokemon;
