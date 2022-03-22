import { Flex, FlexProps } from "@chakra-ui/react";
import * as React from "react";
import ImageWithFallback from "./ImageWithFallback";

interface ThumbnailProps {
  src: string;
  loader?: JSX.Element | string;
  fallback?: string;
}

/**
 *
 * `ImageWithFallback` wrapped in a countainer with
 * the following props set to default:
 *
 * - border-radius
 * - background-color
 * - box-shadow
 *
 * @example
 * <Thumbnail
 *    w="24px"
 *    h="24px"
 *    mt={1}
 *    src="image.svg"
 *    loader={<Skeleton ... />}
 *    fallback="fallback.svg"
 * />
 *
 */
const Thumbnail = React.forwardRef<
  HTMLImageElement,
  ThumbnailProps & FlexProps
>(({ src, loader, fallback, ...props }, ref) => {
  return (
    <Flex
      ref={ref}
      align="center"
      justify="center"
      bgColor="others.gray.800"
      rounded="md"
      shadow="md"
      {...props}
    >
      <ImageWithFallback
        src={src}
        maxW="90%"
        maxH="90%"
        loader={loader}
        fallback={fallback}
      />
    </Flex>
  );
});

Thumbnail.displayName = "Thumbnail";
export default Thumbnail;
