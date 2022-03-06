import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { ComponentProps, PropsWithChildren } from "react";
import IPaginated from "types/paginated";

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({
  onNext,
  onPrev,
  page,
  pageSize,
  totalRows,
}: PaginationProps & Omit<IPaginated, "rows">) => {
  return (
    <HStack justify="space-between" align="baseline" w="full">
      <Text fontSize="sm" color="gray.600">
        POKEDEX {currentYear}
      </Text>

      <HStack direction="row" align="center" justify="end">
        <Box ml={6}>
          <Text fontSize="sm">
            Page {page} of {getTotalPage(pageSize, totalRows)}
          </Text>
        </Box>

        <PaginationButton onClick={onPrev}>
          <ChevronLeftIcon w={6} h={6} color="white" />
        </PaginationButton>
        <PaginationButton onClick={onNext}>
          <ChevronRightIcon w={6} h={6} color="white" />
        </PaginationButton>
      </HStack>
    </HStack>
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

const getTotalPage = (pageSize: number, totalRows: number) => {
  return Math.ceil(totalRows / pageSize);
};

const currentYear = new Date().getFullYear();

export default Pagination;
