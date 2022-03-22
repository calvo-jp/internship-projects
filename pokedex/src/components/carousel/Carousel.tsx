import { Box, BoxProps } from "@chakra-ui/react";
import * as React from "react";

interface CarouselProps {
  /** ms to wait before going to next slide */
  delay?: number;
}

/**
 *
 * Carousel effect using scroll
 *
 * @example
 * <Carousel w="400px" h="400px" delay={5000}>
 *    <Box p={4}>...</Box>
 *    <Box p={4}>...</Box>
 *    <Box p={4}>...</Box>
 * </Carousel>
 *
 */
const Carousel = ({ delay, children, ...props }: CarouselProps & BoxProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const totalSlides = React.Children.count(children);
  const childrenArray = React.Children.toArray(children);
  const [currentSlide, setCurrentSlide] = React.useState(1);

  const increment = () => setCurrentSlide((current) => current + 1);
  const decrement = () => setCurrentSlide((current) => current - 1);

  const prev = React.useCallback(() => {
    if (currentSlide > 1) decrement();
    // go to last slide
    else setCurrentSlide(totalSlides);
  }, [currentSlide, totalSlides]);

  const next = React.useCallback(() => {
    if (currentSlide < totalSlides) increment();
    // go back to first slide
    else setCurrentSlide(1);
  }, [currentSlide, totalSlides]);

  const slide = React.useCallback(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const offsetWidth = carousel.offsetWidth;

    // start scrolling on mount
    carousel.scrollLeft = offsetWidth * (currentSlide - 1);
  }, [currentSlide]);

  React.useEffect(() => {
    slide();

    // auto next
    const timeout = setTimeout(next, delay || 3000);

    return () => clearTimeout(timeout);
  }, [delay, next, slide]);

  return (
    <Box
      {...props}
      // should be placed here inorder not to be overriden by
      ref={carouselRef}
      display="flex"
      overflowX="hidden"
      scrollBehavior="smooth"
    >
      {React.Children.map(childrenArray, (child) => {
        if (!React.isValidElement(child)) return null;

        return React.cloneElement(child, {
          width: "full",
          height: "full",
          flexShrink: 0,
        });
      })}
    </Box>
  );
};

export default Carousel;
