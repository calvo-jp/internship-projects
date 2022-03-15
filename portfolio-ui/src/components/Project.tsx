import {
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import IProject from "types/project";

interface ProjectProps {
  data: IProject;
}

const Project = ({ data }: ProjectProps) => {
  const href = "/works/" + data.id;

  return (
    <Link href={href} passHref>
      <Stack as="a" gap={4} direction={{ base: "column", lg: "row" }}>
        <Image
          alt=""
          src={data.image}
          w={{ base: "full", lg: "246px" }}
          h={{ base: "auto", lg: "180px" }}
        />

        <Flex justify="space-between" direction="column" gap={4}>
          <Heading fontWeight="bold" fontSize={{ base: "2xl", lg: "3xl" }}>
            {data.title}
          </Heading>

          <HStack gap={{ base: 4, lg: 6 }}>
            <Tag
              bgColor="brand.indigo"
              color="white"
              fontWeight="black"
              fontSize={{ lg: "lg" }}
              py={1}
              px={3}
              rounded="full"
            >
              {data.createdAt}
            </Tag>

            <Text fontSize={{ lg: "xl" }} color="#8695A4">
              {data.tags.join(", ")}
            </Text>
          </HStack>

          <Text>{data.body}</Text>
        </Flex>
      </Stack>
    </Link>
  );
};

export default Project;
