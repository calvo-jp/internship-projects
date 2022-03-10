import { ChevronLeftIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Progress,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { GetPokemon } from "types/GetPokemon";
import getPokemonImage from "utils/getPokemonImage";

interface WidgetProps {
  data: NonNullable<GetPokemon["pokemon_v2_pokemon_by_pk"]>;
  redirectUrl: string;
}

const PokemonWidget = ({ data, ...etc }: WidgetProps) => {
  return (
    <Stack spacing={0}>
      <Header data={data} {...etc} />

      <Stack spacing={{ base: 2, md: 4 }} p={{ base: 2, md: 4 }}>
        <Stats stats={data.pokemon_v2_pokemonstats} />
        <Moves moves={data.pokemon_v2_pokemonmoves} />
        <Abilities abilities={data.pokemon_v2_pokemonabilities} />
      </Stack>
    </Stack>
  );
};

interface AbilitiesProps {
  abilities: WidgetProps["data"]["pokemon_v2_pokemonabilities"];
}

const Abilities = ({ abilities }: AbilitiesProps) => {
  return (
    <Card title="Abilities">
      <Wrap direction="column" spacing={1} fontSize="sm">
        {abilities.map((ability) => (
          <WrapItem key={ability.id}>
            {ability.pokemon_v2_ability?.name}
          </WrapItem>
        ))}
      </Wrap>
    </Card>
  );
};

interface MovesProps {
  moves: WidgetProps["data"]["pokemon_v2_pokemonmoves"];
}

const Moves = ({ moves }: MovesProps) => {
  return (
    <Card title="Moves">
      <Wrap spacing={1}>
        {moves.map((move) => (
          <WrapItem
            key={move.id}
            fontSize="sm"
            bg="orange.100"
            p={2}
            rounded="md"
          >
            {move.pokemon_v2_move?.name}
          </WrapItem>
        ))}
      </Wrap>
    </Card>
  );
};

interface StatsProps {
  stats: WidgetProps["data"]["pokemon_v2_pokemonstats"];
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <Card title="Stats">
      {stats.map((stat) => {
        return (
          <Stack key={stat.id} spacing={0}>
            <Text fontSize="sm" color="gray.600">
              {stat.pokemon_v2_stat?.name}
            </Text>

            <Flex alignItems="center" gap={2}>
              <Progress
                value={stat.base_stat}
                size="xs"
                rounded="sm"
                colorScheme="orange"
                flexGrow={1}
              />

              <Text fontSize="xs">{stat.base_stat}</Text>
            </Flex>
          </Stack>
        );
      })}
    </Card>
  );
};

interface CardProps {
  title: string;
}

const Card = ({ title, children }: PropsWithChildren<CardProps>) => {
  return (
    <Box p={6} bg="white" shadow="md" rounded="sm">
      <Flex align="center" gap={2}>
        <SettingsIcon color="gray.400" w={4} h={4} />

        <Text as="h4" fontSize="lg">
          {title}
        </Text>
      </Flex>

      <Box mt={8}>{children}</Box>
    </Box>
  );
};

const Header = ({ data, redirectUrl }: WidgetProps) => {
  return (
    <Center
      position="relative"
      bgGradient="linear(to right, orange.400, yellow.500)"
      roundedBottom={{ base: 0, md: "3xl" }}
      py={8}
    >
      <BackButton href={redirectUrl} />

      <VStack align="center">
        <Avatar src={getPokemonImage(data)} />

        <Heading color="white" fontWeight="bold" fontSize="4xl">
          {data.name}
        </Heading>

        <Types types={data.pokemon_v2_pokemontypes} />
      </VStack>
    </Center>
  );
};

const BackButton = ({ href }: { href: string }) => {
  return (
    <Link href={href} passHref>
      <IconButton
        aria-label="Go back"
        as="a"
        rounded="full"
        position="absolute"
        bg={{ base: "blackAlpha.300", lg: "orange.400" }}
        borderWidth={{ lg: 4 }}
        borderColor="gray.50"
        borderStyle="solid"
        top={{ base: 4, lg: 8 }}
        left={{ base: 4, lg: -8 }}
        w={{ base: 12, lg: 16 }}
        h={{ base: 12, lg: 16 }}
        _hover={{ lg: { bgColor: "orange.500" } }}
        _focus={{ boxShadow: "none" }}
      >
        <ChevronLeftIcon color="white" width={10} height={10} />
      </IconButton>
    </Link>
  );
};

interface TypesProps {
  types: WidgetProps["data"]["pokemon_v2_pokemontypes"];
}

const Types = ({ types }: TypesProps) => {
  return (
    <Wrap>
      {types.map((type) => (
        <WrapItem
          key={type.id}
          bgColor="whiteAlpha.300"
          py={1}
          px={4}
          rounded="full"
        >
          <Text fontWeight="bold" color="white">
            {type.pokemon_v2_type?.name}
          </Text>
        </WrapItem>
      ))}
    </Wrap>
  );
};

const Avatar = ({ src }: { src: string }) => {
  return (
    <Box p={8} bgColor="whiteAlpha.400" w="fit-content" rounded="full">
      <Box position="relative" width={125} height={125}>
        <Image src={src} alt="" layout="fill" />
      </Box>
    </Box>
  );
};

export default PokemonWidget;
