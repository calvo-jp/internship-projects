import { Box, Flex, Image } from "@chakra-ui/react";
import * as React from "react";

interface SliderProps {
  images: HTMLImageElement[];
  active?: HTMLImageElement;
  onSelect?: (image: HTMLImageElement) => void;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ images, active, onSelect }, ref) => {
    // remove duplicates
    const srcs = images.reduce<HTMLImageElement[]>((array, image) => {
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
            const selected = active && active.src === image.src;

            return (
              <Box
                p={4}
                key={image.src}
                rounded="lg"
                cursor="pointer"
                scrollSnapAlign="start"
                onClick={() => onSelect && onSelect(image)}
                border="1px"
                borderColor={selected ? "#46526ceb" : "transparent"}
                bgColor="#ffffff0f"
                flexShrink={0}
                h="100px"
                w="100px"
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
