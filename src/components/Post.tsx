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
    <Link passHref href={"/blog/" + data.id}>
      <Box w="full" as="a">
        <Heading
          fontWeight={featured ? 700 : 500}
          fontSize={
            featured
              ? { base: "22px", md: "26px" } /* on landing */
              : { base: "26px", md: "30px" } /* on blog */
          }
        >
          {data.title}
        </Heading>

        <HStack
          mt={1}
          gap={2}
          align="center"
          fontSize={
            featured
              ? { base: "16px", md: "18px" } /* on landing */
              : { base: "16px", md: "20px" } /* on blog */
          }
        >
          <Text>{data.createdAt}</Text>

          <Divider
            height="18px"
            borderColor="brand.black"
            orientation="vertical"
          />

          <Text color={featured ? "inherit" : "brand.gray"}>
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
