import { ChevronLeftIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Progress,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import IPokemon from "types/pokemon";

interface WidgetProps {
  data: IPokemon;
  redirectUrl: string;
}

const PokemonWidget = ({ data, ...etc }: WidgetProps) => {
  return (
    <Stack>
      <Header data={data} {...etc} />

      <Stack p={6} spacing={4}>
        <Stats stats={data.stats} />
        <Moves moves={data.moves} />
        <Abilities abilities={data.abilities} />
      </Stack>
    </Stack>
  );
};

const Abilities = ({ abilities }: { abilities: string[] }) => {
  return (
    <Card title="Abilities">
      <Wrap direction="column" spacing={1} fontSize="sm">
        {abilities.map((ability) => (
          <WrapItem key={ability}>{ability}</WrapItem>
        ))}
      </Wrap>
    </Card>
  );
};

const Moves = ({ moves }: { moves: string[] }) => {
  return (
    <Card title="Moves">
      <Wrap spacing={1}>
        {moves.map((move) => (
          <WrapItem key={move} fontSize="sm" bg="orange.100" p={2} rounded="md">
            {move}
          </WrapItem>
        ))}
      </Wrap>
    </Card>
  );
};

const Stats = ({ stats }: { stats: IPokemon["stats"] }) => {
  return (
    <Card title="Stats">
      {stats.map((stat) => {
        return (
          <Stack key={stat.name} spacing={0}>
            <Text fontSize="sm" color="gray.600">
              {stat.name}
            </Text>

            <Flex alignItems="center" gap={2}>
              <Progress
                value={stat.value}
                colorScheme="orange"
                size="xs"
                flexGrow={1}
              />

              <Text fontSize="xs">{stat.value}</Text>
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
    <Flex
      bgGradient="linear(to right, orange.400, yellow.500)"
      px={4}
      py={8}
      align="center"
      justify="center"
      roundedBottom="3xl"
      position="relative"
    >
      <BackButton href={redirectUrl} />

      <Stack align="center">
        <Avatar src={data.image} />

        <Text color="white" fontWeight="bold" fontSize="4xl">
          {data.name}
        </Text>

        <Types items={data.types} />
      </Stack>
    </Flex>
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

const Types = ({ items }: { items: string[] }) => {
  return (
    <Wrap>
      {items.map((item) => (
        <WrapItem
          key={item}
          bgColor="whiteAlpha.300"
          py={1}
          px={4}
          rounded="full"
        >
          <Text fontWeight="bold" color="white">
            {item}
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
