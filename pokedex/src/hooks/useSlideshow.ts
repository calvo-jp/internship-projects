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
   * if true,
   * will go to first slide when pressing next on last slide and
   * will go to last slide when pressing prev on first slide
   *
   */
  loop?: boolean;

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

const defaultConfig: Required<Config> = {
  loop: false,
  delay: 3,
  autoPlay: false,
  currentSlide: 1,
  itemsPerSlide: 1,
  onSlideChange: noop,
};

const useSlideshow = <T extends Array<any>>(data: T, config?: Config) => {
  const {
    loop,
    delay,
    autoPlay,
    currentSlide: slideStartIndex,
    itemsPerSlide,
    onSlideChange,
  } = { ...defaultConfig, ...config };

  const slides = arrayChunk(data, itemsPerSlide);
  const totalSlides = slides.length;

  const [playing, setPlaying] = React.useState(autoPlay);
  const [currentSlide, setCurrentSlide] = React.useState(slideStartIndex);

  const increment = React.useCallback(
    (amount?: number) => {
      setCurrentSlide((old) => {
        const current = old + (amount ?? 1);
        onSlideChange(current);
        return current;
      });
    },
    [onSlideChange]
  );

  const decrement = React.useCallback(
    (amount?: number) => {
      setCurrentSlide((old) => {
        const current = old - (amount ?? 1);
        onSlideChange(current);
        return current;
      });
    },
    [onSlideChange]
  );

  const prev = React.useCallback(() => {
    if (currentSlide > 1) return decrement();

    if (loop) increment(totalSlides - currentSlide);
  }, [currentSlide, decrement, increment, loop, totalSlides]);

  const next = React.useCallback(() => {
    if (currentSlide < totalSlides) return increment();

    if (loop) decrement(totalSlides - 1);
  }, [currentSlide, decrement, increment, loop, totalSlides]);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  // listen to slide index changes outside
  React.useEffect(() => {
    setCurrentSlide(slideStartIndex);
  }, [slideStartIndex]);

  // autoplay slideshow
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
