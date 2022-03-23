import * as React from "react";
import arrayChunk from "utils/arrayChunk";

const useSlideshow = <T extends Array<any>>(data: T) => {
  const [slides, setSlides] = React.useState<T[]>([]);
  const [currentSlide, setCurrentSlide] = React.useState(1);

  const increment = () => setCurrentSlide((current) => current + 1);
  const decrement = () => setCurrentSlide((current) => current - 1);

  const prev = React.useCallback(() => {
    if (currentSlide > 1) return decrement();

    setCurrentSlide(slides.length);
  }, [currentSlide, slides.length]);

  const next = React.useCallback(() => {
    if (currentSlide < slides.length) return increment();

    setCurrentSlide(1);
  }, [currentSlide, slides.length]);

  React.useEffect(() => {
    setSlides(arrayChunk(data, 6));
  }, [data]);

  return {
    next,
    prev,
    slides,
    currentSlide,
  };
};

export default useSlideshow;
