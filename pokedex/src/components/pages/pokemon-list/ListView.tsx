import { Spinner } from "@chakra-ui/react";
import GridTable from "components/widgets/gridTable";
import GridTableCell from "components/widgets/gridTable/GridTableCell";
import GridTableHeading from "components/widgets/gridTable/GridTableHeading";
import GridTableRow from "components/widgets/gridTable/GridTableRow";
import Thumbnail from "components/widgets/Thumbnail";
import { useRouter } from "next/router";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
import unkebab from "utils/unkebab";
import { GetPokemons } from "__generated__/GetPokemons";

interface ListViewProps {
  data: GetPokemons["pokemons"];
}

const ListView = ({ data }: ListViewProps) => {
  const router = useRouter();
  const handleClick = (id: number) => () => router.push("/pokemons/" + id);

  return (
    <GridTable columns="49px 75px 1fr 1fr 1fr" bgColor="brand.gray.700">
      <GridTableRow
        px={4}
        py={3}
        borderColor="brand.gray.300"
        borderBottom="1px"
      >
        {"#||Pokemon|Type|Level".split(/\|/).map((heading) => (
          <GridTableHeading key={heading}>{heading}</GridTableHeading>
        ))}
      </GridTableRow>

      {data.map(({ id, name, types }) => (
        <GridTableRow
          key={id}
          py={3}
          px={4}
          borderColor="brand.gray.300"
          borderBottom="1px"
          cursor="pointer"
          _hover={{ bgColor: "brand.gray.600" }}
          _focus={{ bgColor: "brand.gray.600", outline: "none" }}
          onClick={handleClick(id)}
          tabIndex={1}
        >
          <GridTableCell>{id}</GridTableCell>
          <GridTableCell>
            <Thumbnail
              w="32px"
              h="32px"
              src={getPokemonImageUrl(id)}
              bgColor="transparent"
              shadow="none"
              loader={<Spinner size="md" />}
            />
          </GridTableCell>
          <GridTableCell>{unkebab(name)}</GridTableCell>
          <GridTableCell>
            {types.map((type) => type.type?.name || "").join(", ")}
          </GridTableCell>
          <GridTableCell>Lvl 1</GridTableCell>
        </GridTableRow>
      ))}
    </GridTable>
  );
};

export default ListView;
