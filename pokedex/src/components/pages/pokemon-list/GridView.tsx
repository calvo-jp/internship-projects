import { Box, Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
import ImageWithFallback from "components/widgets/ImageWithFallback";
import Thumbnail from "components/widgets/Thumbnail";
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
  const bgColor = getColorByType(data.types.at(0)?.type?.name || "", {
    mode: "dark",
  });

  return (
    <Link href={"/pokemons/" + data.id} passHref>
      <Box as="a" h="260px" bgColor={bgColor}>
        <Flex flexGrow="1" align="center" justify="center" w="full">
          <Flex
            bgColor="#dddddd24"
            rounded="full"
            p={4}
            w="150px"
            h="150px"
            align="center"
            justify="center"
          >
            <ImageWithFallback
              maxW="90%"
              maxH="90%"
              src={getImageUrlById(data.id)}
              loader={<Spinner size="xl" />}
            />
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default GridView;
