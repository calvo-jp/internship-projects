import { Box, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import IPost from "types/post";

interface PostProps {
  data: IPost;
  /** set this to true on landing page */
  featured?: boolean;
}

const Post = ({ data, featured }: PostProps) => {
  return (
    <Link passHref href={`/blog/${data.id}`}>
      <Box w="full" as="a">
        <Heading
          fontWeight={featured ? "bold" : "medium"}
          fontSize={
            featured
              ? { base: "xl", md: "2xl" } /* on landing */
              : { base: "2xl", md: "3xl" } /* on blog */
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
              ? { base: "md", md: "lg" } /* on landing */
              : { base: "md", md: "xl" } /* on blog */
          }
        >
          <Text>{data.createdAt}</Text>

          <Divider h={4} borderColor="brand.black" orientation="vertical" />

          <Text color={featured ? "inherit" : "brand.gray"}>
            {data.tags.join(", ")}
          </Text>
        </HStack>

        <Text mt={4}>{data.body}</Text>
      </Box>
    </Link>
  );
};

export default Post;
