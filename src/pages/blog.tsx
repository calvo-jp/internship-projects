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

interface Props {
  data: IPost[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await services.posts.read.all();

  return {
    props: {
      data,
    },
  };
};

const Blog: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Portfolio UI | Blog</title>
      </Head>

      <Navbar />
      <Box as="main">
        <Wrapper>
          <PageTitle label="Blog" />
          <Posts items={data} />
        </Wrapper>
      </Box>
      <Footer />
    </>
  );
};

const Posts = ({ items }: { items: IPost[] }) => {
  return (
    <Box>
      {items.map((post) => (
        <Box key={post.id} mt={8}>
          <Post data={post} />
          <Divider mt={8} />
        </Box>
      ))}
    </Box>
  );
};

export default Blog;
