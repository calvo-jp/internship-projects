import { Box, Fade, Flex, Image } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import * as React from "react";
import valx from "utils/valx";
import Container from "./Container";
import Control from "./Control";
import { getZoomableImage, hideScrollbar, showScrollbar } from "./utils";

const Lightbox = () => {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);
  const [images, setImages] = React.useState<HTMLImageElement[]>([]);
  const [currentImage, setCurrentImage] = React.useState<HTMLImageElement>();

  const init = React.useCallback(() => {
    images.map((image) => {
      image.addEventListener("click", () => {
        setOpen(true);
        setCurrentImage(image);
        setImages((old) => [
          image,
          ...old.filter(({ src }) => src !== image.src),
        ]);
      });
    });
  }, [images]);

  const slideLeft = React.useCallback(() => {
    if (sliderRef.current) sliderRef.current.scrollLeft -= 400;
  }, []);

  const slideRight = React.useCallback(() => {
    if (sliderRef.current) sliderRef.current.scrollLeft += 400;
  }, []);

  const handleThumbnailClick = React.useCallback((image: HTMLImageElement) => {
    return () => setCurrentImage(image);
  }, []);

  React.useEffect(
    () => init(),
    [images /* weird, but this improves performance */, init]
  );

  React.useEffect(() => setImages(getZoomableImage()), []);

  React.useEffect(() => {
    open && hideScrollbar();
    !open && showScrollbar();
  }, [open]);

  React.useEffect(() => {
    return () => {
      setOpen(false);
      setImages([]);
      setCurrentImage(undefined);
      showScrollbar();
    };
  }, []);

  return (
    <Fade in={open} unmountOnExit>
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

            <Box overflow="hidden" h="full">
              <Box
                ref={sliderRef}
                scrollSnapType="x mandatory"
                scrollBehavior="smooth"
                overflow="hidden"
                display="flex"
                gap={2}
                h="full"
              >
                {images.map((image) => {
                  const selected =
                    currentImage && currentImage.src === image.src;

                  return (
                    <Image
                      alt=""
                      maxH="full"
                      src={image.src}
                      key={image.src}
                      scrollSnapAlign="start"
                      onClick={handleThumbnailClick(image)}
                      border="1px"
                      borderColor={valx({
                        green: selected,
                        transparent: !selected,
                      })}
                    />
                  );
                })}
              </Box>
            </Box>

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
    </Fade>
  );
};

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
