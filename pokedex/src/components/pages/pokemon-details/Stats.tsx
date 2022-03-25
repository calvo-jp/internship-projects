import { useQuery } from "@apollo/client";
import {
  Center,
  Flex,
  Spinner,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import AnimatedProgress from "components/widgets/AnimatedProgress";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import { GET_POKEMON_STATS } from "graphql/pokeapi/queries";
import * as React from "react";
import services from "services";
import getColorByType from "utils/pokemons/getColorByType";
import randomIdGenerator from "utils/randomIdGenerator";
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
    // include experience
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
            <Flex align="center" fontWeight="medium" key={generateId()}>
              <Text w="45px">{stat.label}</Text>
              <AnimatedProgress
                ml={8}
                mr={4}
                size="xs"
                rounded="full"
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
  const [loading, setLoading] = React.useState(true);
  const [weaknesses, setWeaknesses] = React.useState<string[]>([]);

  React.useEffect(() => {
    services.pokemons
      .weaknesses(types)
      .then(setWeaknesses)
      .finally(() => setLoading(false));

    return () => {
      setLoading(true);
      setWeaknesses([]);
    };
  }, [types]);

  return <Chips title="Weaknesses" items={weaknesses} loading={loading} />;
};

interface ResistanceProps {
  types: Types;
}

const Resistance = ({ types }: ResistanceProps) => {
  const [loading, setLoading] = React.useState(true);
  const [resistance, setResistance] = React.useState<string[]>([]);

  React.useEffect(() => {
    services.pokemons
      .resistance(types)
      .then(setResistance)
      .finally(() => setLoading(false));

    return () => {
      setLoading(true);
      setResistance([]);
    };
  }, [types]);

  return <Chips title="Resistant" items={resistance} loading={loading} />;
};

interface ChipsProps {
  title: string;
  items: string[];
  loading?: boolean;
}

const Chips = ({ title, items, loading }: ChipsProps) => {
  return (
    <Card w="full" bgColor="others.gray.800">
      <CardHeading>{title}</CardHeading>

      <Flex mt={6} gap={2} wrap="wrap">
        {loading && <Spinner />}
        {items.map((item) => (
          <Tag
            key={generateId()}
            py={2}
            px={4}
            rounded="full"
            bgColor={getColorByType(item, "brand.gray.800")}
          >
            <TagLabel>{item}</TagLabel>
          </Tag>
        ))}
      </Flex>
    </Card>
  );
};

const generateId = randomIdGenerator();
export default Stats;
