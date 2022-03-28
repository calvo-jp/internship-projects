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
import useTabQuery from "hooks/useTabQuery";
import capitalize from "utils/capitalize";
import getColorByType from "utils/pokemons/getColorByType";
import unkebab from "utils/unkebab";
import { GetPokemon } from "__generated__/GetPokemon";
import About from "./About";
import Evolution from "./Evolution";
import Moves from "./Moves";
import Stats from "./Stats";
import Videos from "./Videos";

type TPokemon = NonNullable<GetPokemon["pokemon"]>;

interface RightPaneProps {
  data: TPokemon;
}

const tabs = "about|statistics|evolution|moves|videos".split(/\|/);

const RightPane = ({ data }: RightPaneProps) => {
  const currentTab = useTabQuery();
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
        <TabList
          gap={4}
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              color="brand.gray.50"
              bgColor="brand.gray.800"
              fontWeight="medium"
              rounded="sm"
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
          <TabPanel p={0}>
            <Videos search={data.name} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default RightPane;
