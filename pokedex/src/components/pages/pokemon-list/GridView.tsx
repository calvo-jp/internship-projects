import { Flex, SimpleGrid, Spinner } from "@chakra-ui/react";
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
  const bgColor = getColorByType(data.types.at(0)?.type?.name || "", {
    mode: "dark",
  });

  return (
    <Link href={"/pokemons/" + data.id} passHref>
      <Flex
        as="a"
        flexGrow="1"
        align="center"
        justify="center"
        h={{ base: "300px", lg: "260px" }}
        bgColor={bgColor}
      >
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
            fallback="/assets/pokeball.png"
          />
        </Flex>
      </Flex>
    </Link>
  );
};

export default GridView;
