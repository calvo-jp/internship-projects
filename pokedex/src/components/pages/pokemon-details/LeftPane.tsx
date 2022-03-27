import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import Photo from "components/widgets/Photo";
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
    <VStack spacing={12} align="start">
      <Flex
        w="full"
        h="390px"
        align="center"
        justify="center"
        rounded="sm"
        bgColor={getColorByType(data.types.at(0)?.type?.name || "")}
      >
        <Photo
          maxW="80%"
          maxH="80%"
          src={getImageUrlById(data.id)}
          loader={<Spinner size="xl" />}
          fallback={getImageUrlById(data.id, "PNG")}
          data-lightbox-item=""
        />
      </Flex>

      <Box alignSelf="center">
        <Slideshow />
      </Box>
    </VStack>
  );
};

export default LeftPane;
