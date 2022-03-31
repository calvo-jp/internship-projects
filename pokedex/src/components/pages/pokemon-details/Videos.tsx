import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import YoutubeIcon from "components/icons/Youtube";
import InfiniteScroll from "components/InfiniteScroll";
import Alert from "components/widgets/Alert";
import { useCallback, useEffect, useState } from "react";
import services from "services";
import dateFormatter from "utils/dateFormatter";
import noop from "utils/noop";
import randomIdGenerator from "utils/randomIdGenerator";

interface VideosProps {
  search: string;
}

type YoutubeResult = Awaited<ReturnType<typeof services.youtube.search>>;

const Videos = ({ search }: VideosProps) => {
  const [data, setData] = useState<YoutubeResult>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(async () => {
    setLoading(true);

    try {
      const response = await services.youtube.search({
        query: [search, "pokemon"],
        token: data?.nextPageToken,
      });

      setData((current) => {
        if (!current) return response;

        return {
          etag: response.etag,
          kind: response.kind,
          items: [...current.items, ...response.items],
          pageInfo: response.pageInfo,
          regionCode: response.regionCode,
          nextPageToken: response.nextPageToken,
          previousPageToken: response.previousPageToken,
        };
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

    // This causes re-renders all the time
    // needs refactoring or rewriting of codes
  }, [data?.nextPageToken, search]);

  useEffect(() => {
    if (!data) performSearch();

    return () => setError(undefined);
  }, [data, performSearch]);

  const hasNext = data && data.nextPageToken;

  return (
    <Box>
      <Alert mb={8} open={!!error} variant="warning" message={error} />

      {data && (
        <SimpleGrid columns={{ lg: 2 }} gap={4} mb={4}>
          {data.items.map((item) => (
            <Item
              data={item}
              key={
                item.id.videoId +
                // some items are duplicates
                // they are exactly the same video with same id
                // need to generate uniqid due to console errors
                generateId()
              }
            />
          ))}
        </SimpleGrid>
      )}

      {loading && (
        <Center mt={8}>
          <Spinner size="lg" />
        </Center>
      )}

      <InfiniteScroll callback={performSearch} paused={loading || !hasNext} />
    </Box>
  );
};

interface ItemProps {
  data: YoutubeResult["items"][number];
}

const Item = ({ data }: ItemProps) => {
  const [playing, setPlaying] = useState(false);

  const play = () => setPlaying(true);
  const stop = () => setPlaying(false);

  useEffect(() => () => setPlaying(false), []);

  return (
    <>
      <Card
        image={data.snippet.thumbnails.high.url}
        title={data.snippet.title}
        date={data.snippet.publishTime}
        onClick={play}
      />

      <Player
        src={`https://youtube.com/embed/${data.id.videoId}?autoplay=1&modestbranding=1&fs=0&cc_lang_pref=en&color=yellow`}
        open={playing}
        onClose={stop}
      />
    </>
  );
};

interface CardProps {
  title: string;
  image: string;
  // date string
  date: string;
  onClick?: () => void;
}

const Card = ({ title, date, image, onClick }: CardProps) => {
  return (
    <Box
      onClick={onClick}
      bgColor="brand.gray.800"
      border="1px"
      borderColor="transparent"
      shadow="md"
      cursor="pointer"
      boxShadow="none"
      transitionProperty="borderColor boxShadow"
      transitionDuration="300ms"
      _hover={{
        ring: 2,
        ringColor: "blue.800",
        borderColor: "blue.700",
      }}
    >
      <AspectRatio>
        <Image src={image} alt="" />
      </AspectRatio>

      <HStack p={4} spacing={4}>
        <Icon
          as={YoutubeIcon}
          w={8}
          h={8}
          fill="brand.gray.200"
          display="block"
        />

        <VStack align="start" spacing={0}>
          <Text
            noOfLines={1}
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />

          <Text fontSize="xs" color="brand.gray.400">
            {dateFormatter.format(new Date(date))}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

interface PlayerProps {
  src?: string;
  open?: boolean;
  onClose?: () => void;
}

const Player = ({ src, open, onClose = noop }: PlayerProps) => {
  return (
    <Modal onClose={onClose} size="full" isOpen={!!open}>
      <ModalOverlay>
        <ModalContent bgColor="blackAlpha.500">
          <ModalCloseButton />

          <ModalBody display="flex" alignItems="center">
            <Box w="full">
              <AspectRatio maxW="800px" mx="auto">
                <iframe
                  src={src}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </AspectRatio>
            </Box>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

const generateId = randomIdGenerator();
export default Videos;
