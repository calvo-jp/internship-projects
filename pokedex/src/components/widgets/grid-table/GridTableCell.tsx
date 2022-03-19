import { GridItem, GridItemProps } from "@chakra-ui/react";

const GridTableCell = ({ children, ...props }: GridItemProps) => {
  return (
    <GridItem color="brand.gray.50" {...props}>
      {children}
    </GridItem>
  );
};

export default GridTableCell;
