import { useQuery } from "@apollo/client";
import {
  Center,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import CardTag from "components/widgets/card/CardTag";
import GridTable from "components/widgets/gridTable";
import GridTableCell from "components/widgets/gridTable/GridTableCell";
import GridTableHeading from "components/widgets/gridTable/GridTableHeading";
import GridTableRow from "components/widgets/gridTable/GridTableRow";
import { GET_POKEMON_MOVES } from "graphql/pokeapi/queries";
import * as React from "react";
import arrayChunk from "utils/arrayChunk";
import unkebab from "utils/unkebab";
import {
  GetPokemonMoves,
  GetPokemonMovesVariables,
} from "__generated__/GetPokemonMoves";

interface MovesProps {
  /** pokemon id */
  id: number;
}

const Moves = ({ id }: MovesProps) => {
  const { loading, data, refetch } = useQuery<
    GetPokemonMoves,
    GetPokemonMovesVariables
  >(GET_POKEMON_MOVES, {
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

  // TODO: return error and add option for refetch
  if (!data?.moves) return null;

  return (
    <VStack spacing={8}>
      <QuickMoves moves={data.moves.quick ?? []} />
      <MainMoves moves={data.moves.main ?? []} />
    </VStack>
  );
};

interface QuickMovesProps {
  moves: NonNullable<GetPokemonMoves["moves"]>["quick"];
}

const QuickMoves = ({ moves }: QuickMovesProps) => {
  return (
    <Card w="full">
      <VStack spacing={6} align="start">
        <CardHeading>Quick moves</CardHeading>

        <Flex wrap="wrap" gap={4}>
          {moves.map(({ move }) => {
            if (!move) return null;

            return (
              <CardTag variant="info" key={move.name}>
                {unkebab(move.name)}
              </CardTag>
            );
          })}
        </Flex>
      </VStack>
    </Card>
  );
};

interface MainMovesProps {
  moves: NonNullable<GetPokemonMoves["moves"]>["main"];
}

const MainMoves = ({ moves }: MainMovesProps) => {
  const chunks = arrayChunk(moves, 5);
  const [current, setCurrent] = React.useState(0);

  const display = chunks.reduce((array, chunk, idx) => {
    return idx <= current ? [...array, ...chunk] : array;
  }, []);

  const hasMore = current < chunks.length - 1;
  const [scrollHeight, setScrollHeight] = React.useState(0);

  const showMore = () => {
    if (!hasMore) return;
    setCurrent((old) => old + 1);
  };

  React.useEffect(() => {
    setScrollHeight(document.body.scrollHeight);
  }, [current]);

  React.useEffect(() => {
    if (window.pageYOffset) window.scrollTo(0, scrollHeight);
  }, [scrollHeight]);

  return (
    <Card w="full">
      <SimpleGrid columns={2}>
        <VStack spacing={6} align="start">
          <CardHeading>Main Moves</CardHeading>

          {display
            .map(({ move }) => (move ? move.name : ""))
            .filter((value) => value.length > 0)
            .map((tag) => (
              <CardTag variant="info" key={tag}>
                {unkebab(tag)}
              </CardTag>
            ))}
        </VStack>

        <GridTable columns="repeat(3, 1fr)">
          <GridTableRow p={1} borderBottom="1px">
            {"Damage|DPS|EPS".split(/\|/).map((heading) => (
              <GridTableHeading textAlign="center" key={heading}>
                {heading}
              </GridTableHeading>
            ))}
          </GridTableRow>

          {display.map(({ id, move }) => {
            if (!move) return null;

            return (
              <GridTableRow key={id} p={4} borderBottom="1px">
                <GridTableCell textAlign="center">{move.power}</GridTableCell>
                <GridTableCell textAlign="center">{move.pp}</GridTableCell>
                <GridTableCell textAlign="center">{move.pp}</GridTableCell>
              </GridTableRow>
            );
          })}
        </GridTable>
      </SimpleGrid>

      {hasMore && (
        <Flex mt={6} justify="end" fontSize="sm" color="brand.primary">
          <HStack as="button" onClick={showMore}>
            <Text as="span">Show more</Text>
            <Icon as={ChevronDownIcon} />
          </HStack>
        </Flex>
      )}
    </Card>
  );
};

export default Moves;
