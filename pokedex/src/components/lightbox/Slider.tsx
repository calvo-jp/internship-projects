import { Box, Flex, Image } from "@chakra-ui/react";
import { forwardRef } from "react";

interface SliderProps {
  items: HTMLImageElement[];
  selected?: HTMLImageElement;
  onSelect?: (image: HTMLImageElement) => void;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  ({ items, selected, onSelect }, ref) => {
    // remove duplicates
    const srcs = items.reduce<HTMLImageElement[]>((array, image) => {
      if (array.some(({ src }) => image.src === src)) return array;

      return [...array, image];
    }, []);

    return (
      <Box overflowX="hidden" h="full">
        <Flex
          ref={ref}
          gap={1}
          align="center"
          justify="start"
          overflow="hidden"
          scrollSnapType="x mandatory"
          scrollBehavior="smooth"
          h="100px"
        >
          {srcs.map((image) => {
            const active = selected && selected.src === image.src;

            return (
              <Box
                key={image.src}
                p={4}
                h="100px"
                w="100px"
                border="1px"
                borderColor={active ? "#46526ceb" : "transparent"}
                bgColor="#ffffff0f"
                rounded="lg"
                cursor="pointer"
                scrollSnapAlign="start"
                flexShrink={0}
                onClick={() => onSelect && onSelect(image)}
              >
                <Image alt="" h="full" src={image.src} />
              </Box>
            );
          })}
        </Flex>
      </Box>
    );
  }
);

Slider.displayName = "Slider";

export default Slider;
