import * as React from "react";
import arrayChunk from "utils/arrayChunk";
import noop from "utils/noop";

interface Config {
  /**
   *
   * seconds to wait before going to next slide
   *
   */
  delay?: number;

  /**
   *
   * start playing on mount
   *
   */
  autoPlay?: boolean;

  /**
   *
   * start to a specific slide number
   *
   * _starts at 1 since this is not zero-based_
   *
   */
  currentSlide?: number;
  itemsPerSlide?: number;
  onSlideChange?: (currentSlide: number) => void;
}

const useSlideshow = <T extends Array<any>>(data: T, config?: Config) => {
  const {
    delay = 3,
    autoPlay = false,
    itemsPerSlide = 1,
    onSlideChange = noop,
    currentSlide: slideStartIndex = 1,
  } = config ?? {};

  const slides = arrayChunk(data, itemsPerSlide);
  const totalSlides = slides.length;

  const [playing, setPlaying] = React.useState(autoPlay);
  const [currentSlide, setCurrentSlide] = React.useState(slideStartIndex);

  const increment = React.useCallback(() => {
    setCurrentSlide((old) => {
      const current = old + 1;
      onSlideChange(current);
      return current;
    });
  }, [onSlideChange]);

  const decrement = React.useCallback(() => {
    setCurrentSlide((old) => {
      const current = old - 1;
      onSlideChange(current);
      return current;
    });
  }, [onSlideChange]);

  const prev = React.useCallback(() => {
    if (currentSlide > 1) return decrement();
    setCurrentSlide(totalSlides);
  }, [currentSlide, decrement, totalSlides]);

  const next = React.useCallback(() => {
    if (currentSlide < totalSlides) return increment();
    setCurrentSlide(1);
  }, [currentSlide, increment, totalSlides]);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  React.useEffect(() => {
    if (!playing) return;

    const timeout = setTimeout(next, delay * 1000); // convert delay to ms

    return () => clearTimeout(timeout);
  }, [delay, next, playing]);

  return {
    next,
    prev,
    play,
    pause,
    slides,
    playing,
    totalSlides,
    currentSlide,
  };
};

export default useSlideshow;
