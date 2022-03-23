import { useQuery } from "@apollo/client";
import { SimpleGrid, VStack } from "@chakra-ui/react";
import Card from "components/widgets/card";
import CardHeading from "components/widgets/card/CardHeading";
import CardTag from "components/widgets/card/CardTag";
import GridTable from "components/widgets/gridTable";
import GridTableCell from "components/widgets/gridTable/GridTableCell";
import GridTableHeading from "components/widgets/gridTable/GridTableHeading";
import GridTableRow from "components/widgets/gridTable/GridTableRow";
import { GET_POKEMON_MOVES } from "graphql/pokeapi/queries";
import randomIdGenerator from "utils/randomIdGenerator";
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

  // TODO: add loader
  if (loading) return null;

  // TODO: return error and add option for refetch
  if (!data?.moves) return null;

  return (
    <VStack spacing={8}>
      <QuickMoves moves={data.moves} />
      <MainMoves moves={data.moves} />
    </VStack>
  );
};

interface QuickMovesProps {
  moves: NonNullable<GetPokemonMoves["moves"]>;
}

const QuickMoves = ({ moves }: QuickMovesProps) => {
  return (
    <Card w="full">
      <SimpleGrid columns={2}>
        <MovesTags
          heading="Quick Moves"
          items={moves.quick.map(({ move }) => move?.name ?? "")}
        />

        <MovesTable
          data={[
            [10, 10, 10],
            [14, 9.1, 6.4],
          ]}
        />
      </SimpleGrid>
    </Card>
  );
};

interface MainMovesProps {
  moves: NonNullable<GetPokemonMoves["moves"]>;
}

const MainMoves = ({ moves }: MainMovesProps) => {
  return (
    <Card w="full">
      <SimpleGrid columns={2}>
        <MovesTags
          heading="Main Moves"
          items={moves.main.map(({ move }) => move?.name ?? "")}
        />

        <MovesTable
          data={[
            [10, 10, 10],
            [14, 9.1, 6.4],
            [12, 6.5, 8],
            [13, 3, 8],
          ]}
        />
      </SimpleGrid>
    </Card>
  );
};

interface MovesTagsProps {
  heading: string;
  items: string[];
}

const MovesTags = ({ heading, items }: MovesTagsProps) => {
  return (
    <VStack spacing={6} align="start">
      <CardHeading>{heading}</CardHeading>

      {items.map((tag) => (
        <CardTag variant="info" key={generateId()}>
          {tag}
        </CardTag>
      ))}
    </VStack>
  );
};

interface MovesTableProps {
  /**
   *
   * This should match the number of headings
   * inorder not to mess out the layout
   *
   */
  data: (string | number)[][];
}

const MovesTable = ({ data, ...props }: MovesTableProps) => {
  return (
    <GridTable columns="repeat(3, 1fr)" {...props}>
      <GridTableRow p={2} borderBottom="1px">
        {"Damage|DPS|EPS".split(/\|/).map((heading) => (
          <GridTableHeading textAlign="center" key={heading}>
            {heading}
          </GridTableHeading>
        ))}
      </GridTableRow>

      {data.map((cells) => (
        <GridTableRow key={generateId()} p={4} borderBottom="1px">
          {cells.map((cell) => (
            <GridTableCell key={generateId()} textAlign="center">
              {cell}
            </GridTableCell>
          ))}
        </GridTableRow>
      ))}
    </GridTable>
  );
};

const generateId = randomIdGenerator();
export default Moves;
