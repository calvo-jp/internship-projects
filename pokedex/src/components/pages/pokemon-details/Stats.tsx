import { useQuery } from "@apollo/client";
import {
  Box,
  Center,
  Flex,
  Progress,
  Spinner,
  Tag,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import { GET_POKEMON_STATS } from "graphql/pokeapi/queries";
import { useEffect, useState } from "react";
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
  const { loading, data } = useQuery<GetPokemonStats, GetPokemonStatsVariables>(
    GET_POKEMON_STATS,
    {
      variables: { id },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading) <Loader />;
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
            <Flex align="center" fontWeight="medium" key={generateId()} gap={2}>
              <Text w="35px">{stat.label}</Text>

              <Progress
                size="xs"
                rounded="full"
                colorScheme={stat.color}
                bgColor="brand.gray.200"
                value={stat.value}
                flexGrow="1"
              />

              <Text w="45px">{stat.value}%</Text>
            </Flex>
          );
        })}
      </Card>

      <OtherStats types={data.pokemon.types} />
    </VStack>
  );
};

const Loader = () => {
  return (
    <Center>
      <Spinner size="lg" />
    </Center>
  );
};

interface OtherStatsProps {
  types: NonNullable<GetPokemonStats["pokemon"]>["types"];
}

type TOtherStats = Awaited<
  ReturnType<typeof services.pokemons.stats["read"]["all"]>
>;

const OtherStats = ({ types }: OtherStatsProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TOtherStats>({
    resistance: [],
    weaknesses: [],
  });

  useEffect(() => {
    const ids = types.filter(({ type }) => !!type).map(({ type }) => type!.id);

    services.pokemons.stats.read
      .all(ids)
      .then(setData)
      .finally(() => setLoading(false));

    return () => {
      setLoading(true);
      setData({
        resistance: [],
        weaknesses: [],
      });
    };
  }, [types]);

  return (
    <>
      <Chips title="Weaknesses" items={data.resistance} loading={loading} />
      <Chips title="Resistant" items={data.weaknesses} loading={loading} />
    </>
  );
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
            bgColor={getColorByType(item)}
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
