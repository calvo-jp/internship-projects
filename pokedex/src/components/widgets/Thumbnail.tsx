import { Flex, FlexProps } from "@chakra-ui/react";
import * as React from "react";
import Photo from "./Photo";

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
      rounded="sm"
      shadow="md"
      {...props}
    >
      <Photo src={src} maxW="80%" maxH="80%" loader={loader} />
    </Flex>
  );
});

Thumbnail.displayName = "Thumbnail";
export default Thumbnail;
