import { Flex, HStack, Spinner, Tag } from "@chakra-ui/react";
import GridTable from "components/widgets/grid-table";
import GridTableCell from "components/widgets/grid-table/GridTableCell";
import GridTableHeading from "components/widgets/grid-table/GridTableHeading";
import GridTableRow from "components/widgets/grid-table/GridTableRow";
import Photo from "components/widgets/Photo";
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
        borderColor: "brand.gray.50",
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
          _hover={{ bgColor: "brand.gray.600" }}
          _focus={{ bgColor: "brand.gray.600", outline: "none" }}
          onClick={handleClick(id)}
          tabIndex={1}
        >
          <GridTableCell>{id}</GridTableCell>
          <GridTableCell>
            <Flex w="32px" h="32px" justify="center" align="center">
              <Photo
                maxW="full"
                maxH="full"
                src={getImageUrlById(id)}
                loader={<Spinner size="md" />}
                fallback={getImageUrlById(id, "PNG")}
                data-lightbox-item=""
              />
            </Flex>
          </GridTableCell>
          <GridTableCell>{unkebab(name)}</GridTableCell>
          <GridTableCell>
            <HStack spacing={1}>
              {types
                .map(({ type }) => type?.name || "")
                .map((type) => (
                  <Tag key={type} bgColor={getColorByType(type)} rounded="lg">
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
