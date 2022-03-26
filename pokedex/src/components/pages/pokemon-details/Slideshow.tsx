import {
  Flex,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import ImageWithFallback from "components/widgets/ImageWithFallback";
import useSlideshow from "hooks/useSlideshow";
import useStore from "hooks/useStore";
import Link from "next/link";
import * as React from "react";
import getImageUrlById from "utils/pokemons/getImageUrlById";
import randomIdGenerator from "utils/randomIdGenerator";

const Slideshow = () => {
  const items = useStore((state) => state.viewedPokemonIds);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const { slides, next, prev, play, pause, playing } = useSlideshow(items, {
    delay: 5000,
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
      <Control type="previous" onClick={prev} />

      <Flex
        ref={sliderRef}
        overflowX="hidden"
        scrollBehavior="smooth"
        w="187px"
      >
        {slides.map((ids) => (
          <SimpleGrid key={generateId()} gap={2} columns={3} flexShrink={0}>
            {ids.map((id) => (
              <SlideItem key={id} id={id} />
            ))}
          </SimpleGrid>
        ))}
      </Flex>

      <Control type="next" onClick={next} />
    </HStack>
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
      rounded="full"
      shadow="md"
      bgColor="brand.gray.800"
      {...props}
    />
  );
};

const SlideItem = ({ id }: { id: number }) => {
  return (
    <Link passHref href={"/pokemons/" + id}>
      <Flex
        as="a"
        width="57px"
        height="57px"
        padding={2}
        rounded="sm"
        bgColor="brand.gray.800"
        align="center"
        justify="center"
        tabIndex={-1}
      >
        <ImageWithFallback
          maxW="80%"
          maxH="80%"
          src={getImageUrlById(id)}
          alt=""
          loader={<Spinner />}
        />
      </Flex>
    </Link>
  );
};

const generateId = randomIdGenerator();
export default Slideshow;
