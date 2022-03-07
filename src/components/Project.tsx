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
import IProject from "types/project";

interface ProjectProps {
  data: IProject;
}

const Project = ({ data }: ProjectProps) => {
  return (
    <Box>
      <Stack direction="row" gap={4}>
        <Image src={data.image} alt="" w="246px" height="180px" />

        <Flex justify="space-between" direction="column">
          <Heading fontWeight={700} fontSize="30px">
            {data.title}
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
              {data.createdAt}
            </Badge>

            <Text fontSize="20px" color="#8695A4">
              {data.tags.join(", ")}
            </Text>
          </HStack>

          <Text fontSize="16px">{data.body}</Text>
        </Flex>
      </Stack>

      <Divider mt={8} />
    </Box>
  );
};

export default Project;
