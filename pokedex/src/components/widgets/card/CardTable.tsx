import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

interface CardTableProps {
  headings: string[];
  data: (string | number)[][];
}

const CardTable = ({ headings, data }: CardTableProps) => {
  return (
    <Table>
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
            <Tr key={uuid()}>
              {row.map((value) => (
                <Td key={uuid()} textAlign="center">
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

export default CardTable;
