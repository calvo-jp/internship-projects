import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import * as React from "react";
import IPaginated from "types/paginated";
import valx from "utils/valx";

interface PaginationProps extends Omit<IPaginated, "rows"> {
  onPageChange: (page: number) => void;
}

const Pagination = ({
  onPageChange,
  page,
  hasNext,
  totalRows,
  pageSize,
}: PaginationProps) => {
  const previous = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const next = () => {
    if (hasNext) onPageChange(page + 1);
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
