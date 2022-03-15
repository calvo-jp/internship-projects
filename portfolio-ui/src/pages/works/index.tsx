import { Divider, VStack } from "@chakra-ui/react";
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

        <Divider mt={{ base: 4, lg: 8 }} />
      </Layout>
    </>
  );
};

const Projects = ({ items }: { items: IProject[] }) => {
  return (
    <VStack spacing={{ base: 4, lg: 8 }} divider={<Divider />}>
      {items.map((project) => (
        <Project key={project.id} data={project} />
      ))}
    </VStack>
  );
};

export default Works;
