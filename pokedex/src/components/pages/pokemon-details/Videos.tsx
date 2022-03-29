import {
  AspectRatio,
  Box,
  Center,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import InfiniteScroll from "components/InfiniteScroll";
import Alert from "components/widgets/Alert";
import Photo from "components/widgets/Photo";
import * as React from "react";
import services from "services";

interface VideosProps {
  search: string;
}

type YoutubeResult = Awaited<ReturnType<typeof services.youtube.search>>;

const Videos = ({ search }: VideosProps) => {
  const [data, setData] = React.useState<YoutubeResult>();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const performSearch = React.useCallback(async () => {
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

  const handleClose = () => setError(false);

  React.useEffect(() => {
    performSearch();
  }, [performSearch]);

  const hasNext = data && data.nextPageToken;

  return (
    <Box>
      <SimpleGrid columns={{ lg: 2 }} gap={4}>
        {data?.items.map((item) => (
          <Item key={item.id.videoId} data={item} />
        ))}
      </SimpleGrid>

      {loading && (
        <Center>
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

export default Videos;
