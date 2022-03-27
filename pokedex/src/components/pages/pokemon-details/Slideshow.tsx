import { useQuery } from "@apollo/client";
import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Photo from "components/widgets/Photo";
import { GET_POKEMON_TYPE } from "graphql/pokeapi/queries";
import useSlideshow from "hooks/useSlideshow";
import useStore from "hooks/useStore";
import Link from "next/link";
import * as React from "react";
import getColorByType from "utils/pokemons/getColorByType";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import randomIdGenerator from "utils/randomIdGenerator";
import {
  GetPokemonType,
  GetPokemonTypeVariables,
} from "__generated__/GetPokemonType";

const Slideshow = () => {
  const items = useStore((state) => state.viewedPokemonIds);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const { slides, next, prev } = useSlideshow(items, {
    delay: 5,
    loop: true,
    itemsPerSlide: 6,
    onSlideChange(currentSlide) {
      if (!sliderRef.current) return;

      const slider = sliderRef.current;
      const width = slider.offsetWidth;

      slider.scrollLeft = width * (currentSlide - 1);
    },
  });

  return (
    <VStack>
      <HStack spacing={5}>
        <Control type="previous" onClick={prev} />

        <Flex
          ref={sliderRef}
          overflowX="hidden"
          scrollBehavior="smooth"
          w="187px"
        >
          {slides.map((ids) => (
            <Grid
              key={generateId()}
              gap={2}
              templateColumns="repeat(3, 57px)"
              gridAutoRows="57px"
              flexShrink={0}
            >
              {ids.map((id) => (
                <SlideItem key={id} id={id} />
              ))}
            </Grid>
          ))}
        </Flex>

        <Control type="next" onClick={next} />
      </HStack>

      <Flex></Flex>
    </VStack>
  );
};

interface ControlProps {
  type: "next" | "previous";
}

const Control = ({
  type,
  ...props
}: ControlProps & Omit<React.ComponentProps<"button">, "type">) => {
  const icon = type === "next" ? ChevronRightIcon : ChevronLeftIcon;

  return (
    <IconButton
      size="sm"
      aria-label=""
      icon={<Icon as={icon} stroke="white" />}
      shadow="md"
      rounded="full"
      bgColor="brand.gray.800"
      _hover={{ bgColor: "brand.gray.800" }}
      _active={{ bgColor: "brand.gray.800" }}
      {...props}
    />
  );
};

const SlideItem = ({ id }: { id: number }) => {
  const { data } = useQuery<GetPokemonType, GetPokemonTypeVariables>(
    GET_POKEMON_TYPE,
    { variables: { id } }
  );

  return (
    <Link passHref href={"/pokemons/" + id}>
      <GridItem
        as="a"
        shadow="md"
        rounded="sm"
        padding={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        tabIndex={-1}
        bgColor={getColorByType(data?.pokemon?.types.at(0)?.type?.name ?? "")}
      >
        <Photo
          maxW="80%"
          maxH="80%"
          src={getImageUrlById(id)}
          loader={<Spinner size="sm" />}
          fallback={getImageUrlById(id, "PNG")}
          data-lightbox-item=""
          data-lightbox-noclick=""
        />
      </GridItem>
    </Link>
  );
};

const generateId = randomIdGenerator();
export default Slideshow;
