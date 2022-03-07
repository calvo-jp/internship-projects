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
    <Link href={"/works/" + data.id} passHref>
      <Box as="a">
        <Stack direction={{ base: "column", md: "row" }} gap={4}>
          <Image
            alt=""
            src={data.image}
            w={{ base: "full", md: "246px" }}
            h={{ base: "auto", md: "180px" }}
          />

          <Flex justify="space-between" direction="column" gap={4}>
            <Heading fontWeight={700} fontSize={{ base: "24px", md: "30px" }}>
              {data.title}
            </Heading>

            <HStack gap={4}>
              <Badge
                bgColor="#142850"
                color="white"
                fontWeight={900}
                fontSize={{ base: "16px", md: "18px" }}
                py={1}
                px={3}
                rounded="full"
              >
                {data.createdAt}
              </Badge>

              <Text fontSize={{ base: "16px", md: "20px" }} color="#8695A4">
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
