import { AspectRatio, Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Photo from "components/widgets/Photo";
import * as React from "react";
import services from "services";

interface VideosProps {
  search: string;
}

type YoutubeResult = Awaited<ReturnType<typeof services.youtube.search>>;

const Videos = ({ search }: VideosProps) => {
  const [data, setData] = React.useState<YoutubeResult>();
  const [loading, setLoading] = React.useState(false);

  // const performSearch = React.useCallback(async () => {
  //   try {
  //     const response = await services.youtube.search(search, "pokemon");
  //     setData(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [search]);

  // React.useEffect(() => {
  //   performSearch();
  // }, [performSearch]);

  return (
    <SimpleGrid columns={{ lg: 2 }} gap={4}>
      {Array(10)
        .fill(null)
        .map((_, idx) => (
          <Item key={idx} />
        ))}
    </SimpleGrid>
  );
};

interface ItemProps {
  data?: YoutubeResult["items"][number];
}

const Item = ({ data }: ItemProps) => {
  return (
    <AspectRatio border="1px" borderColor="">
      <iframe
        src="https://www.youtube.com/embed/r0yq_yXFQhg"
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </AspectRatio>
  );
};

export default Videos;
