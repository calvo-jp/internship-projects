import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import PageTitle from "components/PageTitle";
import Project from "components/Project";
import Wrapper from "components/Wrapper";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import services from "services";
import IProject from "types/project";

interface Props {
  data: IProject[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await services.projects.read.all();

  return {
    props: {
      data,
    },
  };
};

const Works: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Portfolio UI | Works</title>
      </Head>

      <Navbar />
      <Box as="main">
        <Wrapper>
          <PageTitle label="Works" />
          <Projects items={data} />
        </Wrapper>
      </Box>
      <Footer />
    </>
  );
};

const Projects = ({ items }: { items: IProject[] }) => {
  return (
    <Box>
      <Wrap spacing={8}>
        {items.map((project) => (
          <WrapItem key={project.id}>
            <Project data={project} />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default Works;
