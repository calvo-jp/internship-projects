import { HStack, Spinner, Tag } from "@chakra-ui/react";
import GridTable from "components/widgets/gridTable";
import GridTableCell from "components/widgets/gridTable/GridTableCell";
import GridTableHeading from "components/widgets/gridTable/GridTableHeading";
import GridTableRow from "components/widgets/gridTable/GridTableRow";
import Thumbnail from "components/widgets/Thumbnail";
import { useRouter } from "next/router";
import getColorByType from "utils/pokemons/getColorByType";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import unkebab from "utils/unkebab";
import { GetPokemons } from "__generated__/GetPokemons";

interface ListViewProps {
  data: GetPokemons["pokemons"];
}

const ListView = ({ data }: ListViewProps) => {
  const router = useRouter();
  const handleClick = (id: number) => () => router.push("/pokemons/" + id);

  return (
    <GridTable
      columns={{ base: "55px 85px 1fr 1fr", lg: "55px 85px 1fr 1fr 1fr" }}
      columnsProps={{
        borderBottom: "1px",
        borderColor: "brand.gray.500",
        bgColor: "brand.gray.700",
      }}
    >
      <GridTableRow px={4} py={3}>
        <GridTableHeading>#</GridTableHeading>
        <GridTableHeading></GridTableHeading>
        <GridTableHeading>Pokemon</GridTableHeading>
        <GridTableHeading>Type</GridTableHeading>
        <GridTableHeading display={{ base: "none", lg: "block" }}>
          Level
        </GridTableHeading>
      </GridTableRow>

      {data.map(({ id, name, types }) => (
        <GridTableRow
          key={id}
          py={2}
          px={4}
          cursor="pointer"
          _hover={{ bgColor: "#323c4a" }}
          _focus={{ bgColor: "#323c4a", outline: "none" }}
          onClick={handleClick(id)}
          tabIndex={1}
        >
          <GridTableCell>{id}</GridTableCell>
          <GridTableCell>
            <Thumbnail
              w="32px"
              h="32px"
              src={getImageUrlById(id)}
              bgColor="transparent"
              shadow="none"
              loader={<Spinner size="md" />}
            />
          </GridTableCell>
          <GridTableCell>{unkebab(name)}</GridTableCell>
          <GridTableCell>
            <HStack spacing={1}>
              {types
                .map((type) => type.type?.name || "")
                .map((type) => (
                  <Tag
                    key={type}
                    bgColor={getColorByType(type, { mode: "dark" })}
                    rounded="lg"
                  >
                    {type}
                  </Tag>
                ))}
            </HStack>
          </GridTableCell>
          <GridTableCell display={{ base: "none", lg: "block" }}>
            Lvl 1
          </GridTableCell>
        </GridTableRow>
      ))}
    </GridTable>
  );
};

export default ListView;
