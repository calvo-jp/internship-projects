import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import IProject from "types/project";

interface ProjectProps {
  data: IProject;
}

const Project = ({ data }: ProjectProps) => {
  return (
    <Link href={`/works/${data.id}`} passHref>
      <Box as="a">
        <Stack gap={4} direction={{ base: "column", lg: "row" }}>
          <Image
            alt=""
            src={data.image}
            w={{ base: "full", lg: "246px" }}
            h={{ base: "auto", lg: "180px" }}
          />

          <Flex justify="space-between" direction="column" gap={4}>
            <Heading fontWeight={700} fontSize={{ base: "24px", lg: "30px" }}>
              {data.title}
            </Heading>

            <HStack gap={4}>
              <Badge
                bgColor="brand.indigo"
                color="white"
                fontWeight={900}
                fontSize={{ base: "16px", lg: "18px" }}
                py={1}
                px={3}
                rounded="full"
              >
                {data.createdAt}
              </Badge>

              <Text fontSize={{ base: "16px", lg: "20px" }} color="#8695A4">
                {data.tags.join(", ")}
              </Text>
            </HStack>

            <Text fontSize="16px">{data.body}</Text>
          </Flex>
        </Stack>

        <Divider mt={8} />
      </Box>
    </Link>
  );
};

export default Project;
