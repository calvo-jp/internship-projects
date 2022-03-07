import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Post from "components/Post";
import Project from "components/Project";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PropsWithChildren } from "react";
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
    <Box bgColor="brand.light">
      <Wrapper>
        <HStack
          align="center"
          justify={{ base: "center", lg: "space-between" }}
        >
          <Heading fontSize={{ base: "18px", lg: "22px" }} fontWeight={400}>
            Recent Posts
          </Heading>

          <Box display={{ base: "none", lg: "block" }}>
            <ChakraLink color="brand.sky">View all</ChakraLink>
          </Box>
        </HStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} mt={4}>
          {items.map((post) => (
            <Box bgColor="brand.white" shadow="sm" p={8} key={post.id}>
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
      <Flex
        py={{ base: 4, lg: 16 }}
        gap={{ base: 8, lg: 16 }}
        align={{ base: "center", lg: "start" }}
        justify={{ base: "", lg: "space-between" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Flex
          direction="column"
          gap={{ base: 4, lg: 8 }}
          order={{ base: 1, lg: 0 }}
          align={{ base: "center", lg: "start" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Heading fontWeight={700} fontSize={{ base: "32px", lg: "44px" }}>
            <div>Hi, I am John,</div>
            <div>Creative Technologist</div>
          </Heading>

          <Text maxW="500px">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>

          <Button bgColor="brand.maroon" color="white" rounded="sm">
            Download Resume
          </Button>
        </Flex>

        <Avatar
          order={{ base: 0, lg: 1 }}
          src="/images/selfie.png"
          h={{ base: "200px", lg: "245px" }}
          w={{ base: "200px", lg: "245px" }}
          borderWidth={8}
          borderStyle="solid"
          borderColor="brand.light"
        />
      </Flex>
    </Wrapper>
  );
};

const Wrapper = (props: PropsWithChildren<{}>) => {
  return (
    <Box maxW="900px" mx="auto" p={{ base: 4, lg: 8 }}>
      {props.children}
    </Box>
  );
};

interface Itemable<T extends IPost | IProject> {
  items: T[];
}

export default Landing;
