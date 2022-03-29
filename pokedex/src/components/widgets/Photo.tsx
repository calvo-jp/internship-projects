import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ImageProps {
  src: string;
  /**
   *
   * Displayed while the image is still loading
   *
   */
  loader?: JSX.Element | string;
  /**
   *
   * fallback src
   *
   */
  fallback?: string;
}

const previouslyLoadedImages: string[] = [];

/**
 *
 * aka. Image
 *
 */
const Photo = ({
  src,
  loader,
  fallback,
  ...props
}: ImageProps & Omit<ChakraImageProps, "fallback" | "fallbackSrc">) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (previouslyLoadedImages.includes(src)) return setLoading(false);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      previouslyLoadedImages.push(src);
      setLoading(false);
    };

    image.onerror = () => {
      setError(true);
      setLoading(false);
    };

    return () => {
      setError(false);
      setLoading(true);

      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <>
      {!!loading && loader}
      {!loading && (
        <ChakraImage src={error ? fallback : src} loading="lazy" {...props} />
      )}
    </>
  );
};

export default Photo;
