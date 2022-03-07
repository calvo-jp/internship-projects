import { Box, Divider, Heading, Text, Wrap } from "@chakra-ui/react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import PageTitle from "components/PageTitle";
import Post from "components/Post";
import Wrapper from "components/Wrapper";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import services from "services";
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

            <Divider mt={{ base: 4, md: 8 }} />
          </Box>
        ))}
    </Box>
  );
};

export default Blog;
