import { Box, Divider } from "@chakra-ui/react";
import Layout from "components/Layout";
import Post from "components/Post";
import Head from "next/head";

const Blog = () => {
  return (
    <>
      <Head>
        <title>Portfolio UI | Blog</title>
      </Head>

      <Layout title="Blog">
        <Posts />
      </Layout>
    </>
  );
};

const Posts = () => {
  return (
    <Box>
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Box key={index} mt={8}>
            <Post
              data={{
                id: 0,
                title: "UI Interactions of the week",
                body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
                tags: ["Express", "Handlebars"],
                createdAt: "12 Feb 2019",
              }}
            />

            <Divider mt={{ base: 4, lg: 8 }} />
          </Box>
        ))}
    </Box>
  );
};

export default Blog;
