import { Flex, FlexProps } from "@chakra-ui/react";
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
const Thumbnail = ({
  src,
  loader,
  fallback,
  ...props
}: ThumbnailProps & FlexProps) => {
  return (
    <Flex
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
};

export default Thumbnail;
