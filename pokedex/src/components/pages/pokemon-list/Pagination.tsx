import { Box, Center, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import * as React from "react";
import valx from "utils/valx";

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({ onNext, onPrev }: PaginationProps) => {
  return (
    <Center>
      <HStack spacing={2}>
        <PageButton onClick={onPrev}>
          <Icon as={ChevronLeftIcon} />
        </PageButton>
        <PageButton>1</PageButton>
        <PageButton active>2</PageButton>
        <PageButton>3</PageButton>
        <PageButton onClick={onNext}>
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
