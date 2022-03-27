import { Box, Flex, Image } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import * as React from "react";
import Container from "./Container";
import Control from "./Control";
import { getLightboxItems, hideScrollbar, showScrollbar } from "./utils";

const Lightbox = () => {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState<HTMLImageElement[]>([]);
  const [currentImage, setCurrentImage] = React.useState<HTMLImageElement>();

  const handleImageClick = React.useCallback((image: HTMLImageElement) => {
    return (e: MouseEvent) => {
      // do not add onclick event
      // but include in slideshow
      if (image.hasAttribute("data-lightbox-noclick")) return;

      e.preventDefault();
      e.stopPropagation();

      setOpen(true);
      setCurrentImage(image);
      setImages((old) => [
        image,
        ...old.filter(({ src }) => src !== image.src),
      ]);
    };
  }, []);

  const init = React.useCallback(() => {
    images.map((image) => {
      // adding attribute to images
      // inorder to recognize them on re-renders
      // and to not add duplicate event handlers
      // which affects performance as tested
      if (image.hasAttribute("data-lightbox-stamp")) return;

      image.setAttribute("data-lightbox-stamp", "");
      image.addEventListener("click", handleImageClick(image));
    });
  }, [handleImageClick, images]);

  const slideLeft = React.useCallback(() => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= 400;
  }, []);

  const slideRight = React.useCallback(() => {
    if (sliderRef.current) sliderRef.current.scrollLeft += 400;
  }, []);

  const handleThumbnailClick = React.useCallback((image: HTMLImageElement) => {
    setCurrentImage(image);
  }, []);

  const loadImages = React.useCallback(() => {
    const lbItems = getLightboxItems();
    if (!lbItems) return;
    setImages(lbItems);
  }, []);

  React.useEffect(() => {
    const timeout = setInterval(loadImages, 1000);
    return () => clearInterval(timeout);
  }, [loadImages]);

  React.useEffect(() => init(), [images, init]);

  React.useEffect(() => {
    open && hideScrollbar();
    !open && showScrollbar();
  }, [open]);

  // separated clean-up to prevent infinite re-rendering
  React.useEffect(() => {
    return () => {
      setOpen(false);
      setImages([]);
      setCurrentImage(undefined);
      showScrollbar();
    };
  }, []);

  return (
    <React.Fragment>
      {open && (
        <Container>
          <Control
            pos="absolute"
            top={3}
            right={4}
            icon={XIcon}
            onClick={() => setOpen(false)}
          />

          <Flex
            align="center"
            h="full"
            w="96%"
            direction="column"
            gap={2}
            mx="auto"
          >
            <Box flexGrow="1" w="full" h="80%">
              {currentImage && <Highlight image={currentImage} />}
            </Box>

            <Box
              h="20%"
              w="90%"
              p={2}
              rounded="lg"
              position="relative"
              bgColor="brand.gray.800"
            >
              <Control
                pos="absolute"
                left={0}
                top="50%"
                ml={-8}
                transform="translateY(-50%)"
                icon={ChevronLeftIcon}
                onClick={slideLeft}
              />

              <Slider
                ref={sliderRef}
                active={currentImage}
                images={images}
                onSelect={handleThumbnailClick}
              />

              <Control
                position="absolute"
                right={0}
                mr={-8}
                top="50%"
                transform="translateY(-50%)"
                icon={ChevronRightIcon}
                onClick={slideRight}
              />
            </Box>
          </Flex>
        </Container>
      )}
    </React.Fragment>
  );
};

interface SliderProps {
  images: HTMLImageElement[];
  active?: HTMLImageElement;
  onSelect?: (image: HTMLImageElement) => void;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ images, active, onSelect }, ref) => {
    // temporary fix
    // have to find a more efficient way to handle duplicate images
    const srcs = images.reduce<HTMLImageElement[]>((array, image) => {
      if (array.some(({ src }) => image.src === src)) return array;
      return [...array, image];
    }, []);

    return (
      <Box overflow="hidden" h="full">
        <Flex
          ref={ref}
          scrollSnapType="x mandatory"
          scrollBehavior="smooth"
          overflow="hidden"
          gap={2}
          align="center"
          h="full"
        >
          {srcs.map((image) => {
            const selected = active && active.src === image.src;

            return (
              <Box
                key={image.src}
                p={4}
                border="1px"
                borderColor={selected ? "#205520" : "transparent"}
                ring={selected ? 2 : 0}
                ringColor="#2c802c1c"
                rounded="sm"
                cursor="pointer"
                scrollSnapAlign="start"
                onClick={() => onSelect && onSelect(image)}
                bgColor="#181f2b"
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

interface HighlightProps {
  image: HTMLImageElement;
}

const Highlight = ({ image }: HighlightProps) => {
  return (
    <Box
      p={4}
      h="full"
      w="full"
      rounded="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgColor="brand.gray.800"
    >
      <Image maxH="full" maxW="80%" src={image.src} alt="" />
    </Box>
  );
};

export default Lightbox;
