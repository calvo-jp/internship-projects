import { SimpleGrid, Spinner } from "@chakra-ui/react";
import Thumbnail from "components/widgets/Thumbnail";
import Link from "next/link";
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
      <Thumbnail
        as="a"
        h="260px"
        src={getImageUrlById(data.id)}
        loader={<Spinner size="xl" />}
      />
    </Link>
  );
};

export default GridView;
