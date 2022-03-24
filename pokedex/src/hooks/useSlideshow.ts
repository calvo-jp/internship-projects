import * as React from "react";
import arrayChunk from "utils/arrayChunk";

interface Config {
  /** ms to wait before going to next slide */
  delay?: number;
  autoPlay?: boolean;
  itemsPerSlide?: number;
  onSlideChange?: (currentSlide: number) => void;
}

const useSlideshow = <T extends Array<any>>(
  data: T,
  { autoPlay, itemsPerSlide, onSlideChange, delay }: Config = {}
) => {
  const [slides, setSlides] = React.useState<T[]>([]);
  const [playing, setPlaying] = React.useState(true);
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

  const pause = React.useCallback(() => {
    setPlaying(false);
  }, []);

  const play = React.useCallback(() => {
    setPlaying(true);
  }, []);

  React.useEffect(() => {
    setSlides(arrayChunk(data, itemsPerSlide ?? 1));
  }, [itemsPerSlide, data]);

  // watch for slide changes
  React.useEffect(() => {
    onSlideChange && onSlideChange(currentSlide);

    if (!playing) return;
    if (!autoPlay) return;

    const msDelay = delay ?? 3000;
    const timeout = setTimeout(next, msDelay);

    return () => clearTimeout(timeout);
  }, [autoPlay, currentSlide, delay, next, onSlideChange, playing]);

  return {
    next,
    prev,
    play,
    pause,
    slides,
    playing,
  };
};

export default useSlideshow;
