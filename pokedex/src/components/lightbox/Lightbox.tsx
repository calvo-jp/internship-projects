import { Box, Image } from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import randomIdGenerator from "utils/randomIdGenerator";
import Container from "./Container";
import Control from "./Control";
import Slider from "./Slider";
import { getLightboxItems, hideScrollbar, showScrollbar } from "./utils";

/**
 *
 * ids of lightbox items with click event handlers already attached
 *
 */
const lbItemsId: string[] = [];

const Lightbox = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentImage, setCurrentImage] = useState<HTMLImageElement>();

  const handleImageClick = useCallback((image: HTMLImageElement) => {
    return (e: MouseEvent) => {
      // do not add onclick event, but include in slideshow
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

  const init = useCallback(() => {
    images.map((image) => {
      // adding ids to images
      // inorder to recognize them on re-renders
      // and to not add duplicate event handlers
      // which affects performance
      const currentLbItemId = image.getAttribute("data-lightbox-item-id");
      // check if item already has an event handler attached
      if (currentLbItemId && lbItemsId.includes(currentLbItemId)) return;

      const lbItemId = generateId();
      // attach id to new item
      image.setAttribute("data-lightbox-item-id", lbItemId);
      lbItemsId.push(lbItemId);
      image.addEventListener("click", handleImageClick(image));
    });
  }, [handleImageClick, images]);

  const handleSlide = (direction: "left" | "right") => {
    return () => {
      const slider = sliderRef.current;
      const wrapper = sliderWrapperRef.current;

      if (!slider) return;
      if (!wrapper) return;

      // next slide's first image must be the last image of current slide
      const amount = wrapper.offsetWidth - 100;
      const currentScrollPos = slider.scrollLeft;

      slider.scrollLeft =
        direction === "left"
          ? currentScrollPos - amount
          : currentScrollPos + amount;
    };
  };

  const handleThumbnailClick = useCallback((image: HTMLImageElement) => {
    setCurrentImage(image);
  }, []);

  const loadImages = useCallback(() => {
    const lbItems = getLightboxItems();
    if (!lbItems) return;
    setImages(lbItems);
  }, []);

  useEffect(() => {
    const timeout = setInterval(loadImages, 1000);

    return () => clearInterval(timeout);
  }, [loadImages]);

  useEffect(() => {
    init();
  }, [images, init]);

  useEffect(() => {
    open && hideScrollbar();
    !open && showScrollbar();
  }, [open]);

  // separated clean-up to prevent infinite re-rendering
  useEffect(() => {
    return () => {
      setOpen(false);
      setImages([]);
      setCurrentImage(undefined);
      showScrollbar();
    };
  }, []);

  if (!open) return null;

  return (
    <Container>
      <Box
        h="78%"
        w="full"
        bgColor="brand.gray.800"
        rounded="lg"
        position="relative"
      >
        <Control
          icon={XIcon}
          position="absolute"
          right={{ base: 2, lg: -4 }}
          top={{ base: 2, lg: -4 }}
          bgColor="#313a48c9"
          _hover={{ bgColor: "#313a48c9" }}
          onClick={() => setOpen(false)}
        />

        {currentImage && <Highlight image={currentImage} />}
      </Box>

      <Box /* fake margin */ h="2%" />

      <Box
        h="20%"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Control icon={ChevronLeftIcon} onClick={handleSlide("left")} />

        <Box
          w={{ base: "70%", md: "80%", lg: "85%" }}
          p={2}
          rounded="lg"
          position="relative"
          bgColor="brand.gray.800"
          ref={sliderWrapperRef}
        >
          <Slider
            ref={sliderRef}
            items={images}
            selected={currentImage}
            onSelect={handleThumbnailClick}
          />
        </Box>

        <Control icon={ChevronRightIcon} onClick={handleSlide("right")} />
      </Box>
    </Container>
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
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image maxH="90%" maxW="90%" src={image.src} alt="" />
    </Box>
  );
};

const generateId = randomIdGenerator();
export default Lightbox;
