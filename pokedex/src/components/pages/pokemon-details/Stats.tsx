import { useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import CardTag from "components/widgets/card/CardTag";
import { GET_POKEMON_STATS } from "graphql/pokeapi/queries";
import {
  GetPokemonStats,
  GetPokemonStatsVariables,
} from "__generated__/GetPokemonStats";

type StatsLegendKey = "hp" | "speed" | "attack" | "defense" | "experience";

interface StatsLegendValue {
  label: string;
  color: string;
}

const statsLegend: Record<StatsLegendKey, StatsLegendValue> = {
  hp: { label: "HP", color: "colorSchemeHacks.rose" },
  speed: { label: "SPD", color: "colorSchemeHacks.purple" },
  attack: { label: "ATK", color: "colorSchemeHacks.amber" },
  defense: { label: "DEF", color: "colorSchemeHacks.teal" },
  experience: { label: "EXP", color: "colorSchemeHacks.gray" },
};

interface StatsProps {
  /** pokemon id */
  id: number;
}

const Stats = ({ id }: StatsProps) => {
  const { loading, data, refetch } = useQuery<
    GetPokemonStats,
    GetPokemonStatsVariables
  >(GET_POKEMON_STATS, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  // TODO: add loader
  if (loading) return null;

  // TODO: add error and refetch option
  if (!data?.pokemon) return null;

  const stats = [
    ...data.pokemon.stats.map(({ stat, id, value }) => {
      if (stat && stat.name in statsLegend) {
        return {
          id,
          value,
          ...statsLegend[stat.name as StatsLegendKey],
        };
      }
    }),
    {
      id,
      value: data.pokemon.experience ?? 0,
      ...statsLegend["experience"],
    },
  ];

  return (
    <VStack spacing={16} align="start">
      <Card w="full">
        {stats.map((stat) => {
          if (!stat) return null;

          return (
            <Flex align="center" fontWeight="medium" key={stat.id}>
              <Text w="45px">{stat.label}</Text>
              <Progress
                ml={8}
                mr={4}
                size="xs"
                colorScheme={stat.color}
                bgColor="brand.gray.200"
                flexGrow="1"
                value={stat.value}
              />
              <Text w="45px">{stat.value}%</Text>
            </Flex>
          );
        })}
      </Card>

      <Card w="full" bgColor="others.gray.800">
        <CardHeading>Weaknesses</CardHeading>

        <Flex mt={6} wrap="wrap" rowGap={4} columnGap={8}>
          {["Rock", "Ground", "Water"].map((weakness) => (
            <HStack spacing={6} key={weakness}>
              <CardTag variant="error">{weakness}</CardTag>

              <Text>
                <Box as="span" color="brand.red.500" mr={1}>
                  160%
                </Box>
                <span>damage</span>
              </Text>
            </HStack>
          ))}
        </Flex>
      </Card>

      <Card w="full" bgColor="others.gray.800">
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
                  <span>damage</span>
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

export default Stats;
