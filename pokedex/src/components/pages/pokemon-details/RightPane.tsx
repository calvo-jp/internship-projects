import {
  Box,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  VStack,
} from "@chakra-ui/react";
import useNavigate from "hooks/useNavigate";
import { useRouter } from "next/router";
import capitalize from "utils/capitalize";
import getColorByType from "utils/pokemons/getColorByType";
import unkebab from "utils/unkebab";
import { GetPokemon } from "__generated__/GetPokemon";
import About from "./About";
import Evolution from "./Evolution";
import Moves from "./Moves";
import Stats from "./Stats";

type TPokemon = NonNullable<GetPokemon["pokemon"]>;

interface RightPaneProps {
  data: TPokemon;
}

const tabs = "about|statistics|evolution|moves".split(/\|/);

const RightPane = ({ data }: RightPaneProps) => {
  const router = useRouter();
  const currentTab = [router.query.tab].flat(1).at(0) || tabs[0];
  const currentTabIdx = tabs.findIndex((tab) => tab === currentTab);
  const navigate = useNavigate({ scroll: false, shallow: true });

  const handleChange = (index: number) => {
    navigate("/pokemons/" + data.id, {
      tab: tabs[index],
    });
  };

  return (
    <Box w="full">
      <VStack spacing={6} align={{ base: "center", lg: "start" }}>
        <Heading>{capitalize(unkebab(data.name), { delimiter: " " })}</Heading>
        <HStack>
          {data.types.map(({ type, id }) => {
            if (!type) return null;

            return (
              <Tag
                py={2}
                px={4}
                key={id}
                color="brand.gray.50"
                bgColor={getColorByType(type.name)}
                rounded="full"
              >
                {capitalize(type.name)}
              </Tag>
            );
          })}
        </HStack>
      </VStack>

      <Tabs
        mt={16}
        isLazy
        variant="unstyled"
        onChange={handleChange}
        index={currentTabIdx}
        lazyBehavior="keepMounted"
      >
        <TabList gap={4} flexWrap="wrap" justifyContent={{ lg: "start" }}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              fontWeight="medium"
              bgColor="brand.gray.800"
              color="brand.gray.50"
              rounded="sm"
              w={{ base: "full", lg: "187px" }}
              _selected={{
                color: "brand.gray.800",
                bgColor: "brand.primary",
              }}
            >
              {capitalize(tab)}
            </Tab>
          ))}
        </TabList>

        <TabPanels mt={14}>
          <TabPanel p={0}>
            <About data={data} />
          </TabPanel>
          <TabPanel p={0}>
            <Stats id={data.id} />
          </TabPanel>
          <TabPanel p={0}>
            <Evolution id={data.id} />
          </TabPanel>
          <TabPanel p={0}>
            <Moves id={data.id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RightPane;
