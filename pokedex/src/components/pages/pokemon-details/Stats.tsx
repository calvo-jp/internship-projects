import { useQuery } from "@apollo/client";
import {
  Center,
  Flex,
  HStack,
  Progress,
  Spinner,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@heroicons/react/outline";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import { GET_POKEMON_STATS } from "graphql/pokeapi/queries";
import * as React from "react";
import services from "services";
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

  // TODO: update to skeleton
  if (loading) {
    return (
      <Center>
        <Spinner size="lg" />
      </Center>
    );
  }

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

      <Weakness types={data.pokemon.types} />
      <Resistance types={data.pokemon.types} />
    </VStack>
  );
};

type Types = NonNullable<GetPokemonStats["pokemon"]>["types"];

interface WeaknessProps {
  types: Types;
}

const Weakness = ({ types }: WeaknessProps) => {
  const [weaknesses, setWeaknesses] = React.useState<string[]>([]);

  React.useEffect(() => {
    services.pokemons.weaknesses(types).then((data) => {
      const unique = data.reduce<string[]>((array, obj) => {
        return array.includes(obj.name) ? array : [...array, obj.name];
      }, []);

      setWeaknesses(unique);
    });

    return () => setWeaknesses([]);
  }, [types]);

  return (
    <Card w="full" bgColor="others.gray.800">
      <CardHeading>Weaknesses</CardHeading>

      <Flex mt={6} gap={2} wrap="wrap">
        {weaknesses.map((weakness) => (
          <Tag key={weakness} py={2} px={4} rounded="full">
            <TagLabel>{weakness}</TagLabel>
          </Tag>
        ))}
      </Flex>
    </Card>
  );
};

interface ResistanceProps {
  types: Types;
}

const Resistance = ({ types }: ResistanceProps) => {
  const [resistance, setResistance] = React.useState<string[]>([]);

  React.useEffect(() => {
    services.pokemons.resistance(types).then((data) => {
      const unique = data.reduce<string[]>((array, obj) => {
        return array.includes(obj.name) ? array : [...array, obj.name];
      }, []);

      setResistance(unique);
    });
  }, [types]);

  return (
    <Card w="full" bgColor="others.gray.800">
      <CardHeading>Resistant</CardHeading>

      <Flex mt={6} gap={2} wrap="wrap">
        {resistance.map((value) => (
          <Tag key={value} py={2} px={4} rounded="full">
            <TagLabel>{value}</TagLabel>
          </Tag>
        ))}
      </Flex>
    </Card>
  );
};

export default Stats;
