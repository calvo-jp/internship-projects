import { Flex, SimpleGrid, Spinner, Tooltip } from "@chakra-ui/react";
import Photo from "components/widgets/Photo";
import Link from "next/link";
import getColorByType from "utils/pokemons/getColorByType";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import { GetPokemons } from "__generated__/GetPokemons";

type Pokemon = GetPokemons["pokemons"][number];

interface GridViewProps {
  data: Pokemon[];
}

const GridView = ({ data }: GridViewProps) => {
  return (
    <SimpleGrid columns={{ md: 2, lg: 4 }} gap={{ base: 4, lg: 8 }}>
      {data.map((pokemon) => (
        <GridViewItem key={pokemon.id} data={pokemon} />
      ))}
    </SimpleGrid>
  );
};

interface GridViewItemProps {
  data: Pokemon;
}

const GridViewItem = ({ data }: GridViewItemProps) => {
  return (
    <Link href={"/pokemons/" + data.id} passHref>
      <Flex
        as="a"
        align="center"
        height={{ base: "300px", lg: "260px" }}
        justify="center"
        bgColor={getColorByType(data.types.at(0)?.type?.name || "")}
        rounded="sm"
        flexGrow="1"
      >
        <Tooltip label={data.name} hasArrow>
          <Flex
            p={4}
            w={{ base: "200px", lg: "150px" }}
            h={{ base: "200px", lg: "150px" }}
            align="center"
            justify="center"
            rounded="full"
            bgColor="#dddddd24"
          >
            <Photo
              maxW="90%"
              maxH="90%"
              src={getImageUrlById(data.id)}
              loader={<Spinner size="xl" />}
              fallback={getImageUrlById(data.id, "PNG")}
            />
          </Flex>
        </Tooltip>
      </Flex>
    </Link>
  );
};

export default GridView;
