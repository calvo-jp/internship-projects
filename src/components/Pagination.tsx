import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { ComponentProps, PropsWithChildren } from "react";

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({ onNext, onPrev }: PaginationProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="baseline"
      w="full"
      mt={4}
    >
      <Box>
        <Text fontSize="sm" color="gray.600">
          POKEDEX {currentYear}
        </Text>
      </Box>

      <Stack direction="row" alignItems="center" justifyContent="end">
        <Box ml={6}>
          <Text fontSize="sm">Page 1 of 300</Text>
        </Box>

        <PaginationButton onClick={onPrev}>
          <ChevronLeftIcon w={6} h={6} color="white" />
        </PaginationButton>

        <PaginationButton onClick={onNext}>
          <ChevronRightIcon w={6} h={6} color="white" />
        </PaginationButton>
      </Stack>
    </Stack>
  );
};

const PaginationButton = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"button">>) => {
  return (
    <Button
      p={2}
      h={10}
      w={10}
      shadow="sm"
      bgColor="orange.400"
      rounded="full"
      _hover={{
        bgColor: "orange.500",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const currentYear = new Date().getFullYear();

export default Pagination;
