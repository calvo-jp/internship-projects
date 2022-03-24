import {
  Flex,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import NextIcon from "components/icons/Next";
import PlayIcon from "components/icons/Play";
import PreviousIcon from "components/icons/Previous";
import StopIcon from "components/icons/Stop";
import ImageWithFallback from "components/widgets/ImageWithFallback";
import useSlideshow from "hooks/useSlideshow";
import useStore from "hooks/useStore";
import Link from "next/link";
import * as React from "react";
import getPokemonImageUrl from "utils/getPokemonImageUrl";
import randomIdGenerator from "utils/randomIdGenerator";

const Slideshow = () => {
  const items = useStore((state) => state.viewedPokemonIds);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const { slides, next, prev, play, pause, playing } = useSlideshow(items, {
    delay: 5000,
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
    <VStack spacing={5}>
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

      <Controls
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        playing={playing}
      />
    </VStack>
  );
};

interface ControlsProps {
  playing?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
}

const Controls = ({
  onNext,
  onPause,
  onPlay,
  onPrev,
  playing,
}: ControlsProps) => {
  return (
    <HStack>
      <Control control="prev" onClick={onPrev} />
      {playing && <Control control="pause" onClick={onPause} />}
      {!playing && <Control control="play" onClick={onPlay} />}
      <Control control="next" onClick={onNext} />
    </HStack>
  );
};

interface ControlProps {
  control: "play" | "pause" | "next" | "prev";
}

const Control = ({
  control,
  ...props
}: ControlProps & React.ComponentProps<"button">) => {
  const getIcon = () => {
    switch (control) {
      case "play":
        return PlayIcon;
      case "pause":
        return StopIcon;
      case "next":
        return NextIcon;
      default:
        return PreviousIcon;
    }
  };

  return (
    <IconButton
      size="sm"
      aria-label=""
      icon={<Icon as={getIcon()} fill="white" />}
      bgColor="brand.gray.800"
      rounded="full"
      shadow="md"
      {...props}
    />
  );
};

const SlideItem = ({ id }: { id: number }) => {
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
        tabIndex={-1}
        p={2}
      >
        <ImageWithFallback
          maxW="80%"
          maxH="80%"
          src={getPokemonImageUrl(id)}
          alt=""
          loader={<Spinner />}
        />
      </Flex>
    </Link>
  );
};

const generateId = randomIdGenerator();
export default Slideshow;
