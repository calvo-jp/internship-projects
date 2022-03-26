import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";
import * as React from "react";

interface ImageProps {
  /** override optional value */
  src: string;
  /** Displayed while the image is still loading */
  loader?: JSX.Element | string;
  /** fallback src */
  fallback?: string;
}

const previouslyLoadedImage: string[] = [];

const Photo = ({
  src,
  loader,
  fallback,
  ...props
}: ImageProps & Omit<ChakraImageProps, "fallback" | "fallbackSrc">) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (previouslyLoadedImage.includes(src)) return setLoading(false);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      previouslyLoadedImage.push(src);
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
    <React.Fragment>
      {!!loading && loader}
      {!loading && (
        <ChakraImage src={error ? fallback : src} loading="lazy" {...props} />
      )}
    </React.Fragment>
  );
};

export default Photo;
