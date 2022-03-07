import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Post from "components/Post";
import Project from "components/Project";
import Wrapper from "components/Wrapper";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { default as Link, default as NextLink } from "next/link";
import services from "services";
import IPost from "types/post";
import IProject from "types/project";

interface Props {
  posts: IPost[];
  projects: IProject[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await services.projects.read.all();
  return {
    props: {
      posts: await services.posts.read.all(),
      projects: projects.filter((project) => !!project.isFeatured),
    },
  };
};

const Landing: NextPage<Props> = ({ posts, projects }) => {
  return (
    <>
      <Head>
        <title>Portfolio UI</title>
      </Head>

      <Navbar />

      <Box as="main">
        <About />
        <RecentPosts items={posts} />
        <FeaturedProjects items={projects} />
      </Box>

      <Footer />
    </>
  );
};

const FeaturedProjects = ({ items }: Itemable<IProject>) => {
  return (
    <Wrapper>
      <Heading fontSize="22px" fontWeight={400}>
        Featured works
      </Heading>

      <Box mt={8}>
        <Wrap spacing={8}>
          {items.map((project) => (
            <WrapItem key={project.id}>
              <Project data={project} />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Wrapper>
  );
};

const RecentPosts = ({ items }: Itemable<IPost>) => {
  return (
    <Box bgColor="#EDF7FA">
      <Wrapper>
        <HStack justify="space-between" align="center">
          <Heading fontSize="22px" fontWeight={400}>
            Recent Posts
          </Heading>

          <NextLink passHref href="/posts/1">
            <ChakraLink color="#00A8CC">View all</ChakraLink>
          </NextLink>
        </HStack>

        <SimpleGrid columns={2} spacing={4} mt={4}>
          {items.map((post) => (
            <Box bgColor="white" shadow="sm" p={8} key={post.id}>
              <Post data={post} featured />
            </Box>
          ))}
        </SimpleGrid>
      </Wrapper>
    </Box>
  );
};

const About = () => {
  return (
    <Wrapper>
      <Stack direction="row" spacing={16} py={8} align="start">
        <Box>
          <Heading fontWeight={700}>
            <div>Hi, I am John,</div>
            <div>Creative Technologist</div>
          </Heading>

          <Text mt={8}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>

          <Button bgColor="#FF6464" color="white" mt={8} rounded="sm">
            Download Resume
          </Button>
        </Box>

        <Avatar
          src="/images/selfie.png"
          size="245px"
          flexBasis="245px"
          flexGrow={0}
          flexShrink={0}
          borderWidth={8}
          borderStyle="solid"
          borderColor="#EDF7FA"
        />
      </Stack>
    </Wrapper>
  );
};

interface Itemable<T extends IPost | IProject> {
  items: T[];
}

export default Landing;
