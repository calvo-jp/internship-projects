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
              ? { base: "xl", lg: "2xl" } /* on landing */
              : { base: "2xl", lg: "3xl" } /* on blog */
          }
        >
          {data.title}
        </Heading>

        <HStack
          mt={4}
          gap={2}
          align="center"
          fontSize={{
            lg: featured ? "lg" /* on landing */ : "xl" /* on blog */,
          }}
          divider={
            <Divider h={4} borderColor="brand.black" orientation="vertical" />
          }
        >
          <Text>{data.createdAt}</Text>
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
