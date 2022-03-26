import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Config {
  /** ms to wait before going to next slide */
  delay?: number;
  autoPlay?: boolean;
  /** start to a specific slide number */
  currentSlide?: number;
  itemsPerSlide?: number;
  onSlideChange?: (currentSlide: number) => void;
}

const useSlideshow = <T extends Array<any>>(data: T, config: Config = {}) => {
  const slides = arrayChunk(data, config.itemsPerSlide ?? 1);
  const totalSlides = slides.length;

  const [playing, setPlaying] = React.useState(config.autoPlay);
  const [currentSlide, setCurrentSlide] = React.useState(
    config.currentSlide ?? 1
  );

  const increment = React.useCallback(() => {
    setCurrentSlide((old) => {
      const current = old + 1;
      config.onSlideChange?.(current);
      return current;
    });
  }, [config]);

  const decrement = React.useCallback(() => {
    setCurrentSlide((old) => {
      const current = old - 1;
      config.onSlideChange?.(current);
      return current;
    });
  }, [config]);

  const prev = React.useCallback(() => {
    if (currentSlide > 1) return decrement();
    setCurrentSlide(slides.length);
  }, [currentSlide, decrement, slides.length]);

  const next = React.useCallback(() => {
    if (currentSlide < slides.length) return increment();
    setCurrentSlide(1);
  }, [currentSlide, increment, slides.length]);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  React.useEffect(() => {
    if (!playing) return;

    const timeout = setTimeout(next, config.delay ?? 3000);

    return () => clearTimeout(timeout);
  }, [config.autoPlay, config.delay, next, playing]);

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
