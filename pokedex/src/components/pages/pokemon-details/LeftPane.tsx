import { Box, Spinner, VStack } from "@chakra-ui/react";
import Thumbnail from "components/widgets/Thumbnail";
import getColorByType from "utils/pokemons/getColorByType";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import { GetPokemon } from "__generated__/GetPokemon";
import Slideshow from "./Slideshow";

type TPokemon = NonNullable<GetPokemon["pokemon"]>;

interface LeftPaneProps {
  data: TPokemon;
}

const LeftPane = ({ data }: LeftPaneProps) => {
  return (
    <VStack spacing={12}>
      <Box
        w="full"
        rounded="sm"
        bgColor={getColorByType(data.types.at(0)?.type?.name || "", {
          mode: "dark",
        })}
      >
        <Thumbnail
          h="390px"
          w="325px"
          mx="auto"
          bgColor="transparent"
          shadow="none"
          src={getImageUrlById(data.id)}
          loader={<Spinner size="xl" />}
        />
      </Box>

      <Slideshow />
    </VStack>
  );
};

export default LeftPane;
