import { GridItem, GridItemProps } from "@chakra-ui/react";

const GridTableHeading = ({ children, ...props }: GridItemProps) => {
  return (
    <GridItem
      fontSize="sm"
      fontWeight="semibold"
      color="brand.gray.100"
      {...props}
    >
      {children}
    </GridItem>
  );
};

export default GridTableHeading;
