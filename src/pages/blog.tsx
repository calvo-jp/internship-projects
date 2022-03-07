import { Box, Divider, Heading, Text, Wrap } from "@chakra-ui/react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import PageTitle from "components/PageTitle";
import Post from "components/Post";
import Wrapper from "components/Wrapper";
import Head from "next/head";
import IPost from "types/post";

const Blog = () => {
  return (
    <>
      <Head>
        <title>Portfolio UI | Blog</title>
      </Head>

      <Navbar />
      <Box as="main">
        <Wrapper>
          <PageTitle label="Blog" />
          <Posts />
        </Wrapper>
      </Box>
      <Footer />
    </>
  );
};

const Posts = () => {
  return (
    <Box>
      {posts.map((post) => (
        <Box key={post.id} mt={8}>
          <Post data={post} />
          <Divider mt={8} />
        </Box>
      ))}
    </Box>
  );
};

const posts: IPost[] = new Array(4).fill(null).map(() => ({
  id: "1",
  title: "UI Interactions of the week",
  body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
  createdAt: "12 Feb 2019",
  tags: ["Express", "Handlebars"],
}));

export default Blog;
