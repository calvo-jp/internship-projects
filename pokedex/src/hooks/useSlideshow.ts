import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Config {
  /** ms to wait before going to next slide */
  delay?: number;
  itemsPerSlide?: number;
  onSlideChange?: (currentSlide: number) => void;
}

const useSlideshow = <T extends Array<any>>(data: T, config: Config = {}) => {
  const [slides, setSlides] = React.useState<T[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(1);

  const increment = () => setCurrentSlide((current) => current + 1);
  const decrement = () => setCurrentSlide((current) => current - 1);

  const prev = React.useCallback(() => {
    if (currentSlide > 1) return decrement();
    // go to last slide
    setCurrentSlide(slides.length);
  }, [currentSlide, slides.length]);

  const next = React.useCallback(() => {
    if (currentSlide < slides.length) return increment();
    // go to first slide
    setCurrentSlide(1);
  }, [currentSlide, slides.length]);

  React.useEffect(() => {
    setSlides(arrayChunk(data, config.itemsPerSlide ?? 1));
  }, [config.itemsPerSlide, data]);

  // watch for slide changes
  React.useEffect(() => {
    config.onSlideChange && config.onSlideChange(currentSlide);

    const msDelay = config.delay ?? 3000;
    const timeout = setTimeout(next, msDelay);

    return () => clearTimeout(timeout);
  }, [config, currentSlide, next]);

  return {
    next,
    prev,
    slides,
  };
};

export default useSlideshow;
