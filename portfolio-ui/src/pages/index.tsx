import {
  Avatar,
  Box,
  Button,
  ChakraComponent,
  Divider,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Post from "components/Post";
import Project from "components/Project";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ComponentProps, PropsWithChildren } from "react";
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
        <Wrapper py={{ base: 15, lg: 18 }}>
          <About />
        </Wrapper>

        <Box bgColor="brand.light">
          <Wrapper>
            <RecentPosts items={posts} />
          </Wrapper>
        </Box>

        <Wrapper>
          <FeaturedProjects items={projects} />
        </Wrapper>
      </Box>

      <Footer />
    </>
  );
};

const FeaturedProjects = ({ items }: Itemable<IProject>) => {
  return (
    <>
      <Heading
        fontSize={{ base: "xl", lg: "2xl" }}
        fontWeight="normal"
        textAlign={{ base: "center", lg: "left" }}
      >
        Featured works
      </Heading>

      <VStack
        mt={{ base: 4, lg: 8 }}
        spacing={{ base: 4, lg: 8 }}
        divider={<Divider />}
      >
        {items.map((project) => (
          <Project data={project} key={project.id} />
        ))}
      </VStack>

      <Divider mt={{ base: 4, lg: 8 }} />
    </>
  );
};

const RecentPosts = ({ items }: Itemable<IPost>) => {
  return (
    <>
      <HStack align="center" justify={{ base: "center", lg: "space-between" }}>
        <Heading fontSize={{ base: "lg", lg: "xl" }} fontWeight="normal">
          Recent Posts
        </Heading>

        <ChakraLink display={{ base: "none", lg: "block" }} color="brand.sky">
          View all
        </ChakraLink>
      </HStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={5} mt={4}>
        {items.map((post) => (
          <Box
            bgColor="brand.white"
            shadow="sm"
            rounded="md"
            p={{ base: 3, lg: 6 }}
            key={post.id}
          >
            <Post data={post} featured />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

const About = () => {
  return (
    <>
      <Flex
        py={{ base: 8, lg: 16 }}
        gap={{ base: 12, lg: 16 }}
        align={{ base: "center", lg: "start" }}
        justify={{ base: "flex-start", lg: "space-between" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Box
          textAlign={{ base: "center", lg: "left" }}
          order={{ base: 1, lg: 0 }}
        >
          <Heading
            as="h1"
            fontWeight="bold"
            fontSize={{ base: "4xl", lg: "5xl" }}
          >
            <div>Hi, I am John,</div>
            <div>Creative Technologist</div>
          </Heading>

          <Text maxW="500px" mt={{ base: 5, lg: 10 }}>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Text>

          <Button
            bgColor="brand.maroon"
            color="white"
            rounded="sm"
            mt={{ base: 7, lg: 10 }}
            _hover={{ bgColor: "brand.maroon" }}
          >
            Download Resume
          </Button>
        </Box>

        <Avatar
          order={{ base: 0, lg: 1 }}
          src="/images/selfie.png"
          h={{ base: "175px", lg: "245px" }}
          w={{ base: "175px", lg: "245px" }}
          borderWidth={{ base: 4, lg: 8 }}
          borderStyle="solid"
          borderColor="brand.light"
        />
      </Flex>
    </>
  );
};

type WrapperProps = ComponentProps<ChakraComponent<"div", {}>>;

const Wrapper = ({ children, ...all }: WrapperProps) => {
  return (
    <Box maxW="900px" mx="auto" p={{ base: 4, lg: 8 }} {...all}>
      {children}
    </Box>
  );
};

interface Itemable<T extends IPost | IProject> {
  items: T[];
}

export default Landing;
