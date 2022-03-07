import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import FacebookIcon from "components/icons/Facebook";
import InstagramIcon from "components/icons/Instagram";
import LinkedInIcon from "components/icons/Linkedin";
import TwitterIcon from "components/icons/Twitter";
import Navbar from "components/Navbar";
import Wrapper from "components/Wrapper";
import Head from "next/head";
import { default as Link, default as NextLink } from "next/link";

const Landing = () => {
  return (
    <>
      <Head>
        <title>Portfolio UI</title>
      </Head>

      <Box>
        <Navbar />
        <About />
        <RecentPosts />
        <Featured />
        <Footer />
      </Box>
    </>
  );
};

const Footer = () => {
  return (
    <Box as="footer" p={8} mt={16}>
      <VStack spacing={4}>
        <Wrap>
          <WrapItem>
            <FacebookIcon />
          </WrapItem>
          <WrapItem>
            <InstagramIcon />
          </WrapItem>
          <WrapItem>
            <TwitterIcon />
          </WrapItem>
          <WrapItem>
            <LinkedInIcon />
          </WrapItem>
        </Wrap>
        <Text fontSize="14px">Copyright ©2020 All rights reserved</Text>
      </VStack>
    </Box>
  );
};

interface FeaturedItemProps {
  title: string;
  body: string;
  category: string;
  image: string;
  createdAt: string;
}

const FeaturedItem = ({
  title,
  category,
  body,
  image,
  createdAt,
}: FeaturedItemProps) => {
  return (
    <Box>
      <Stack direction="row" gap={4}>
        <Image src={image} alt="" w="246px" height="180px" />

        <Flex justify="space-between" direction="column">
          <Heading fontWeight={700} fontSize="30px">
            {title}
          </Heading>

          <HStack gap={4}>
            <Badge
              bgColor="#142850"
              color="white"
              fontWeight={900}
              fontSize="18px"
              py={1}
              px={3}
              rounded="full"
            >
              {createdAt}
            </Badge>

            <Text fontSize="20px" color="#8695A4">
              {category}
            </Text>
          </HStack>

          <Text fontSize="16px">{body}</Text>
        </Flex>
      </Stack>

      <Divider mt={8} />
    </Box>
  );
};

const Featured = () => {
  return (
    <Wrapper>
      <Heading fontSize="22px" fontWeight={400}>
        Featured works
      </Heading>

      <Box mt={8}>
        <Wrap spacing={8}>
          <WrapItem>
            <FeaturedItem
              title="Designing Dashboards"
              body="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
              category="Dashboard"
              image="/images/attachments/dashboard.png"
              createdAt="2020"
            />
          </WrapItem>
          <WrapItem>
            <FeaturedItem
              title="Vibrant Portraits of 2020"
              body="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
              category="Illustration"
              image="/images/attachments/illustration.png"
              createdAt="2018"
            />
          </WrapItem>
          <WrapItem>
            <FeaturedItem
              title="36 Days of Malayalam type"
              body="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
              category="Typography"
              image="/images/attachments/typography.png"
              createdAt="2018"
            />
          </WrapItem>
        </Wrap>
      </Box>
    </Wrapper>
  );
};

interface PostProps {
  id: number | string;
  body: string;
  title: string;
  tags: string[];
  // TODO: change to date
  createdAt: string;
}

const Post = ({ title, body, tags, createdAt }: PostProps) => {
  return (
    <Box bgColor="white" shadow="sm" p={8}>
      <Heading fontSize="26px" fontWeight={700}>
        {title}
      </Heading>

      <HStack gap={2} mt={4}>
        <Text>{createdAt}</Text>
        <Divider height="18px" borderColor="black" orientation="vertical" />
        <Text>{tags.join(", ")}</Text>
      </HStack>

      <Text fontSize="16px" mt={4}>
        {body}
      </Text>
    </Box>
  );
};

const RecentPosts = () => {
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
          <Post
            id={1}
            title="Making a design system from scratch"
            body="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
            tags={["Design", "Pattern"]}
            createdAt="12 Feb 2020"
          />

          <Post
            id={2}
            title="Creating pixel perfect icons in Figma"
            body="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
            tags={["Figma", "Icon Design"]}
            createdAt="12 Feb 2020"
          />
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

export default Landing;
