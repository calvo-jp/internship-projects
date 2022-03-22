import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";
import * as React from "react";

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
   * The fallback image url.
   * Image will result to error if fallback url does not exist
   *
   */
  fallback?: string;
}

const previouslyLoadedImage: string[] = [];

const ImageWithFallback = React.forwardRef<
  HTMLImageElement,
  ImageProps & Omit<ChakraImageProps, "fallback">
>(({ src, loader, fallback, ...props }, ref) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (previouslyLoadedImage.includes(src)) return setLoading(false);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      previouslyLoadedImage.push(src);
      setLoading(false);
    };

    image.onerror = () => setError(true);

    return () => {
      setLoading(true);
      setError(false);

      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <React.Fragment>
      {!!loading && loader}
      {!loading && (
        <ChakraImage
          ref={ref}
          src={!error ? src : fallback}
          loading="lazy"
          {...props}
        />
      )}
    </React.Fragment>
  );
});

ImageWithFallback.displayName = "ImageWithFallback";
export default ImageWithFallback;
