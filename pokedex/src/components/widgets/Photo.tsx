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
}

const previouslyLoadedImage: string[] = [];

const Photo = ({ src, loader, ...props }: ImageProps & ChakraImageProps) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (previouslyLoadedImage.includes(src)) return setLoading(false);

    const image = new Image();
    image.src = src;
    image.onload = () => {
      previouslyLoadedImage.push(src);
      setLoading(false);
    };

    return () => {
      setLoading(true);
      image.onload = null;
    };
  }, [src]);

  return (
    <React.Fragment>
      {!!loading && loader}
      {!loading && <ChakraImage src={src} loading="lazy" {...props} />}
    </React.Fragment>
  );
};

export default Photo;
