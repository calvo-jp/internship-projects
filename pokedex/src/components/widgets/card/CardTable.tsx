import { Table, TableProps, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import createIdGenerator from "utils/createIdGenerator";

interface CardTableProps {
  headings: string[];
  data: (string | number)[][];
}

/**
 *
 * Overridable simple table. Does not support colSpan, rowSpan, etc.
 *
 * @example
 * <CardTable
 *    mt={2}
 *    mb={4}
 *    headings={["heading1", "heading2", "heading3"]}
 *    data={[
 *      [1, 2, 3],
 *      [4, 5, 6],
 *      [7, 8, 9],
 *    ]}
 *    ...
 * />
 */
const CardTable = ({
  headings,
  data,
  ...props
}: CardTableProps & TableProps) => {
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          {headings.map((heading) => (
            <Th
              pt={0}
              color="brand.gray.100"
              borderColor="brand.gray.50"
              key={heading}
            >
              {heading}
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {data.map((row) => {
          return (
            <Tr key={generateId()}>
              {row.map((value) => (
                <Td key={generateId()} textAlign="center">
                  {value}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

const generateId = createIdGenerator();
export default CardTable;
