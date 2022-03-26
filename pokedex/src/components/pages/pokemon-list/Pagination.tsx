import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import * as React from "react";
import IPaginated from "types/paginated";
import valx from "utils/valx";

interface PaginationProps extends Omit<IPaginated, "rows" | "hasNext"> {
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const Pagination = ({
  page,
  pageSize,
  totalRows,
  onPageChange,
}: PaginationProps) => {
  const hasNext = page * pageSize > totalRows;
  const hasPrev = page > 1;

  const next = () => {
    if (onPageChange && hasNext) onPageChange(page + 1);
  };

  const previous = () => {
    if (onPageChange && hasPrev) onPageChange(page - 1);
  };

  return (
    <Center>
      <HStack spacing={2}>
        <PageButton onClick={previous}>
          <Icon as={ChevronLeftIcon} />
        </PageButton>
        <PageButton onClick={next}>
          <Icon as={ChevronRightIcon} />
        </PageButton>
      </HStack>
    </Center>
  );
};

interface PageButtonProps {
  active?: boolean;
  onClick?: () => void;
}

const PageButton = ({
  active,
  onClick,
  children,
}: React.PropsWithChildren<PageButtonProps>) => {
  return (
    <Box
      as="button"
      width={4}
      height={4}
      padding={5}
      color={valx({
        "brand.gray.800": active,
        "brand.gray.100": !active,
      })}
      bgColor={valx({
        "brand.primary": active,
        "brand.gray.800": !active,
      })}
      shadow="md"
      rounded="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _active={{ bgColor: "brand.primary", color: "brand.gray.900" }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default Pagination;
