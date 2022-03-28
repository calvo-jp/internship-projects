import { AspectRatio, Box, SimpleGrid } from "@chakra-ui/react";
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
  const [loading, setLoading] = React.useState(false);

  const performSearch = React.useCallback(async () => {
    setLoading(true);

    try {
      const response = await services.youtube.search(search, "pokemon");
      setData(response);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [search]);

  const handleClose = () => setError(false);

  React.useEffect(() => {
    performSearch();
  }, [performSearch]);

  return (
    <Box>
      <Alert
        mb={4}
        open={false}
        variant="error"
        message="Something went wrong"
        onClose={handleClose}
      />

      <SimpleGrid columns={{ lg: 2 }} gap={4}>
        {data?.items.map((item) => (
          <Item key={item.id.videoId} data={item} />
        ))}

        {[
          "Cw3_PdcL-wY",
          "qqQeR7sVtlE",
          "_h6zCYuBdyI",
          "j9axz6mcalo",
          "dYagFAay2eU",
        ].map((item) => (
          <Item id={item} key={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

type ItemProps = { data: YoutubeResult["items"][number] } | { id: string };

const Item = (props: ItemProps) => {
  const videoId = "id" in props ? props.id : props.data.id.videoId;

  return (
    <AspectRatio border="1px" borderColor="brand.gray.800" shadow="md">
      <iframe
        src={"https://www.youtube.com/embed/" + videoId}
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </AspectRatio>
  );
};

export default Videos;
