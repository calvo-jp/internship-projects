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
          fontWeight={featured ? 700 : 500}
          fontSize={
            featured
              ? { base: "22px", md: "26px" }
              : { base: "26px", md: "30px" }
          }
        >
          {data.title}
        </Heading>

        <HStack
          mt={4}
          gap={2}
          align="center"
          fontSize={
            featured
              ? { base: "16px", md: "18px" }
              : { base: "16px", md: "20px" }
          }
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
