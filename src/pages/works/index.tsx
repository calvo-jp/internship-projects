import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import Layout from "components/Layout";
import Project from "components/Project";
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

      <Layout title="Works">
        <Projects items={data} />
      </Layout>
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
