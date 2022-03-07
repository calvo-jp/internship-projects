import { Box, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import IPost from "types/post";

interface PostProps {
  data: IPost;
  featured?: boolean;
}

const Post = ({ data, featured }: PostProps) => {
  return (
    <Link passHref href={"/blog/" + data.id}>
      <Box w="full" as="a">
        <Heading
          fontSize={featured ? "26px" : "30px"}
          fontWeight={featured ? 700 : 500}
        >
          {data.title}
        </Heading>

        <HStack
          gap={2}
          mt={4}
          fontSize={featured ? "18px" : "20px"}
          align="center"
        >
          <Text>{data.createdAt}</Text>
          <Divider height="18px" borderColor="black" orientation="vertical" />
          <Text color={featured ? "inherit" : "#8695A4"}>
            {data.tags.join(", ")}
          </Text>
        </HStack>

        <Text fontSize="16px" mt={4}>
          {data.body}
        </Text>
      </Box>
    </Link>
  );
};

export default Post;
