import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
} from "@chakra-ui/react";
import * as React from "react";

interface ImageProps {
  src: string;
  loader?: JSX.Element | string;
  fallback?: JSX.Element | string;
}

const previouslyLoadedImage: string[] = [];

const ImageWithFallback = ({
  src,
  loader,
  fallback,
  ...props
}: ImageProps & ChakraImageProps) => {
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
    };
  }, [src]);

  return (
    <React.Fragment>
      {!!loading && loader}
      {!loading && !!error && fallback}
      {!loading && !error && (
        <ChakraImage src={src} loading="lazy" {...props} />
      )}
    </React.Fragment>
  );
};

export default ImageWithFallback;
