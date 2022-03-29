import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import useSlideshow from "hooks/useSlideshow";
import { PropsWithChildren, useMemo } from "react";
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

  const slideItems = useMemo(() => {
    return new Array<number>(totalPages).fill(1).map((v, i) => v + i);
  }, [totalPages]);

  const { slides, currentSlide, next, prev } = useSlideshow(slideItems, {
    itemsPerSlide,
    currentSlide: startSlideIndex,
  });

  const hasNext = page * pageSize < totalRows;
  const hasPrev = page > 1;

  const handleNext = () => {
    if (!hasNext) return;
    if (page % itemsPerSlide === 0) next();
    onPageChange(page + 1);
  };

  const handlePrevious = () => {
    if (!hasPrev) return;
    if (page % itemsPerSlide === 1) prev();
    onPageChange(page - 1);
  };

  const handleClick = (page: number) => () => onPageChange(page);

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
}: PropsWithChildren<PageButtonProps>) => {
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
