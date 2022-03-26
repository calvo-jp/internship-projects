import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import useSlideshow from "hooks/useSlideshow";
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
  onPageChange = noop,
}: PaginationProps) => {
  const itemsPerSlide = 5;
  const startSlideIndex = Math.ceil(page / itemsPerSlide);
  const totalPages = Math.ceil(totalRows / pageSize);

  const { slides, currentSlide, next, prev } = useSlideshow<number[]>(
    new Array(totalPages).fill(1).map((value, index) => value + index),
    {
      itemsPerSlide,
      currentSlide: startSlideIndex,
    }
  );

  const hasNext = page * pageSize < totalRows;
  const hasPrev = page > 1;

  const handleNext = () => {
    if (!hasNext) return;
    onPageChange(page + 1);
    if (page % itemsPerSlide === 0) next();
  };

  const handlePrevious = () => {
    if (!hasPrev) return;
    onPageChange(page - 1);
    if (page % itemsPerSlide === 1) prev();
  };

  const handleClick = (page: number) => {
    return () => onPageChange(page);
  };

  return (
    <Center>
      <HStack spacing={2}>
        <PageButton onClick={handlePrevious}>
          <Icon as={ChevronLeftIcon} />
        </PageButton>

        {slides.at(currentSlide - 1)?.map((number) => (
          <PageButton
            key={number}
            active={page === number}
            onClick={handleClick(number)}
          >
            {number}
          </PageButton>
        ))}

        <PageButton onClick={handleNext}>
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

const noop = function () {};

export default Pagination;
