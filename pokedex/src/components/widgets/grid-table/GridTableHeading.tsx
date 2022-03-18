import { GridItem, GridItemProps } from "@chakra-ui/react";

const GridTableHeading = ({ children, ...props }: GridItemProps) => {
  return (
    <GridItem fontWeight="semibold" {...props}>
      {children}
    </GridItem>
  );
};

export default GridTableHeading;
