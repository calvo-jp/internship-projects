import {
  AspectRatio,
  Box,
  Center,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import InfiniteScroll from "components/InfiniteScroll";
import Alert from "components/widgets/Alert";
import { useCallback, useEffect, useState } from "react";
import services from "services";
import randomIdGenerator from "utils/randomIdGenerator";

interface VideosProps {
  search: string;
}

type YoutubeResult = Awaited<ReturnType<typeof services.youtube.search>>;

// TODO:
// - add error 503 SERVICE NOT AVAILABLE once qouta hit
// - load data on first mount when scroll is not yet scrolled to bottom
const Videos = ({ search }: VideosProps) => {
  const [data, setData] = useState<YoutubeResult>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

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
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }

    // This causes re-renders all the time
    // needs refactoring or rewriting of codes
  }, [data?.nextPageToken, search]);

  useEffect(() => {
    if (firstLoad) performSearch().finally(() => setFirstLoad(false));
  }, [firstLoad, performSearch]);

  const hasNext =
    /* no request has been sent yet */
    !data ||
    /** should have a next page token for succeeding request unless already reached last page */
    (data && data.nextPageToken);

  return (
    <Box>
      <Alert
        mb={8}
        open={!!error}
        variant="warning"
        message="Service currently unavailable"
      />

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
        <Center>
          <Spinner size="lg" />
        </Center>
      )}

      <InfiniteScroll
        callback={performSearch}
        paused={loading || !hasNext || firstLoad}
      />
    </Box>
  );
};

interface ItemProps {
  data: YoutubeResult["items"][number];
}

const Item = ({ data }: ItemProps) => {
  return (
    <AspectRatio border="1px" borderColor="brand.gray.800" shadow="md">
      <iframe
        src={"https://www.youtube.com/embed/" + data.id.videoId}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
};

const generateId = randomIdGenerator();

export default Videos;
