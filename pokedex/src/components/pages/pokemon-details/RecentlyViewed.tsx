import { Flex, HStack, SimpleGrid } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import IconButton from "components/widgets/IconButton";
import ImageWithFallback from "components/widgets/ImageWithFallback";
import useSlideshow from "hooks/useSlideshow";
import useStore from "hooks/useStore";
import Link from "next/link";
import * as React from "react";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
import randomIdGenerator from "utils/randomIdGenerator";

const RecentlyViewed = () => {
  const items = useStore((state) => state.viewedPokemonIds);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const { slides, next, prev } = useSlideshow(items, {
    autoPlay: true,
    itemsPerSlide: 6,
    onSlideChange(currentSlide) {
      if (!sliderRef.current) return;

      const slider = sliderRef.current;
      const width = slider.offsetWidth;

      slider.scrollLeft = width * (currentSlide - 1);
    },
  });

  return (
    <HStack spacing={5}>
      <IconButton icon={ChevronLeftIcon} onClick={prev} />

      <Flex
        ref={sliderRef}
        overflowX="hidden"
        scrollBehavior="smooth"
        w="187px"
      >
        {slides.map((ids) => (
          <SimpleGrid
            key={generateId()}
            rowGap={4}
            columns={3}
            columnGap={2}
            flexShrink={0}
          >
            {ids.map((id) => (
              <RecentlyOpenedItem key={id} id={id} />
            ))}
          </SimpleGrid>
        ))}
      </Flex>

      <IconButton icon={ChevronRightIcon} onClick={next} />
    </HStack>
  );
};

const RecentlyOpenedItem = ({ id }: { id: number }) => {
  return (
    <Link passHref href={"/pokemons/" + id}>
      <Flex
        as="a"
        w="57px"
        h="57px"
        rounded="sm"
        bgColor="brand.gray.800"
        align="center"
        justify="center"
        p={2}
      >
        <ImageWithFallback
          maxW="80%"
          maxH="80%"
          src={getPokemonImageUrl(id)}
          alt=""
        />
      </Flex>
    </Link>
  );
};

const generateId = randomIdGenerator();
export default RecentlyViewed;
